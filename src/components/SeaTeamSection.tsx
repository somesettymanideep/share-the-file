import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { X, Award, GraduationCap, Compass } from "lucide-react";

export interface TeamPrincipal {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  specialization: string;
  education: string;
  projects: string;
}

export const PRINCIPALS: TeamPrincipal[] = [
  {
    id: "ankita-jain",
    name: "ANKITA JAIN",
    role: "PRINCIPAL ARCHITECT",
    image: "/images/team/ankita-jain.jpg",
    bio: "Spearheading master planning and sustainable residential projects with an emphasis on climatic responsiveness, tactile material palettes, and timeless structural proportions.",
    specialization: "Sustainable Master Planning & Luxury Residences",
    education: "B.Arch, School of Planning and Architecture, New Delhi",
    projects: "Gangadhar Estate, Krishna Sindhura Campus, Urban Eco-Villas",
  },
  {
    id: "ritu-arora",
    name: "RITU ARORA",
    role: "PRINCIPAL ARCHITECT",
    image: "/images/team/ritu-arora.jpg",
    bio: "Leading bespoke interior architecture and holistic spatial environments, seamlessly blending artisanal craftsmanship with contemporary lifestyle philosophies.",
    specialization: "Interior Architecture, Materiality & Curation",
    education: "M.Arch, CEPT University, Ahmedabad",
    projects: "Sarika Estate Interiors, Benz Horizon Suites, Studio Headquarters",
  },
  {
    id: "vikas-yadav",
    name: "VIKAS YADAV",
    role: "PRINCIPAL ARCHITECT",
    image: "/images/team/vikas-yadav.jpg",
    bio: "Directing large-scale institutional developments and commercial high-rises, bridging structural ingenuity with advanced integrated delivery systems.",
    specialization: "Commercial Towers & Structural Integration",
    education: "B.Arch, Indian Institute of Technology (IIT) Roorkee",
    projects: "Ramko Heights, KMS Corporate Park, Amaravati Commercial Core",
  },
  {
    id: "pragya-jain",
    name: "PRAGYA JAIN",
    role: "PRINCIPAL ARCHITECT",
    image: "/images/team/pragya-jain.jpg",
    bio: "Guiding institutional campus design, public realm revitalization, and environmental envelope performance across Andhra Pradesh and Telangana.",
    specialization: "Institutional Campuses & Public Architecture",
    education: "B.Arch, Sir J.J. College of Architecture, Mumbai",
    projects: "Manjunatha Health Care Campus, Heritage Cultural Pavilion",
  },
  {
    id: "kapil-kathuria",
    name: "KAPIL KATHURIA",
    role: "PRINCIPAL ARCHITECT",
    image: "/images/team/kapil-kathuria.jpg",
    bio: "Championing Building Information Modeling (BIM Level 2/3), computational design, and parametric facade engineering for zero-defect construction execution.",
    specialization: "Parametric Facades, BIM & Digital Construction",
    education: "M.Sc Computational Architecture",
    projects: "BIM Digital Twins, Modular Care Pavilions, Kinetic Shading Facades",
  },
];

const VERT_SRC = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const FRAG_SRC = `
precision highp float;
uniform sampler2D u_texture;
uniform float u_time;
uniform float u_hover;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Vector from current UV to mouse cursor
  vec2 mouseDist = uv - u_mouse;
  float d = length(mouseDist);
  
  // Dynamic liquid wave refraction expanding from cursor
  float wave = sin(d * 16.0 - u_time * 3.2) * 0.5 + 0.5;
  float falloff = smoothstep(0.75, 0.05, d);
  float ripple = wave * falloff * u_hover * 0.032;
  
  vec2 dir = d > 0.001 ? normalize(mouseDist) : vec2(0.0);
  vec2 dispUv = uv + dir * ripple;
  
  // Chromatic aberration / RGB dispersion along distortion field
  float rgbOffset = (0.003 + 0.010 * falloff) * u_hover;
  float r = texture2D(u_texture, dispUv + vec2(rgbOffset, -rgbOffset * 0.6)).r;
  float g = texture2D(u_texture, dispUv).g;
  float b = texture2D(u_texture, dispUv - vec2(rgbOffset, -rgbOffset * 0.6)).b;
  
  vec3 color = vec3(r, g, b);
  
  // Architectural lens vignette on hover
  float vig = smoothstep(1.3, 0.35, length(uv - 0.5));
  color = mix(color, color * (0.94 + 0.06 * vig), u_hover);
  
  // Subtle luminous contrast lift
  color += vec3(0.015, 0.025, 0.028) * u_hover;
  
  gl_FragColor = vec4(color, 1.0);
}
`;

function TeamCardWebGL({
  member,
  onSelect,
}: {
  member: TeamPrincipal;
  onSelect: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    hover: number;
    targetHover: number;
    mouse: THREE.Vector2;
    targetMouse: THREE.Vector2;
    animating: boolean;
  }>({
    hover: 0,
    targetHover: 0,
    mouse: new THREE.Vector2(0.5, 0.5),
    targetMouse: new THREE.Vector2(0.5, 0.5),
    animating: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check WebGL availability and skip in test/jsdom environments where WebGL is unsupported
    if (typeof window === "undefined" || !("WebGLRenderingContext" in window)) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    } catch {
      gl = null;
    }
    if (!gl) return; // Fall back gracefully to HTML <img>

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let texture: THREE.Texture | null = null;
    let rafId = 0;
    let destroyed = false;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      geometry = new THREE.PlaneGeometry(2, 2);

      const uniforms = {
        u_texture: { value: null as THREE.Texture | null },
        u_time: { value: 0 },
        u_hover: { value: 0 },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_resolution: { value: new THREE.Vector2(1, 1) },
      };

      material = new THREE.ShaderMaterial({
        vertexShader: VERT_SRC,
        fragmentShader: FRAG_SRC,
        uniforms,
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Load image texture
      const loader = new THREE.TextureLoader();
      loader.load(
        member.image,
        (loadedTex) => {
          if (destroyed) {
            loadedTex.dispose();
            return;
          }
          loadedTex.colorSpace = THREE.SRGBColorSpace;
          loadedTex.minFilter = THREE.LinearFilter;
          loadedTex.magFilter = THREE.LinearFilter;
          loadedTex.generateMipmaps = false;
          texture = loadedTex;
          if (material) {
            material.uniforms.u_texture.value = loadedTex;
          }
          renderFrame(0);
        },
        undefined,
        () => {
          // Texture load error: silently fall back to CSS <img>
        }
      );

      const resize = () => {
        if (!container || !renderer || !material) return;
        const rect = container.getBoundingClientRect();
        const w = Math.max(rect.width, 10);
        const h = Math.max(rect.height, 10);
        renderer.setSize(w, h, false);
        material.uniforms.u_resolution.value.set(w, h);
        renderFrame(0);
      };

      resize();

      const ro = new ResizeObserver(resize);
      ro.observe(container);

      let lastTime = performance.now();
      const renderFrame = (now: number) => {
        if (destroyed || !renderer || !scene || !camera || !material) return;
        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        const st = stateRef.current;
        // Smooth lerp
        st.hover += (st.targetHover - st.hover) * 0.14;
        st.mouse.lerp(st.targetMouse, 0.12);

        material.uniforms.u_hover.value = st.hover;
        material.uniforms.u_mouse.value.copy(st.mouse);
        material.uniforms.u_time.value += dt;

        renderer.render(scene, camera);

        // Keep animating if hover is active or still settling
        if (st.animating || Math.abs(st.hover - st.targetHover) > 0.002 || st.targetHover > 0) {
          rafId = requestAnimationFrame(renderFrame);
        } else {
          st.hover = st.targetHover;
          material.uniforms.u_hover.value = st.hover;
          renderer.render(scene, camera);
          rafId = 0;
        }
      };

      const startLoop = () => {
        if (rafId === 0) {
          lastTime = performance.now();
          rafId = requestAnimationFrame(renderFrame);
        }
      };

      const handlePointerEnter = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        stateRef.current.targetHover = 1.0;
        stateRef.current.animating = true;
        stateRef.current.targetMouse.set(
          Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
          Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / rect.height))
        );
        startLoop();
      };

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        stateRef.current.targetMouse.set(
          Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
          Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / rect.height))
        );
        startLoop();
      };

      const handlePointerLeave = () => {
        stateRef.current.targetHover = 0.0;
        stateRef.current.animating = false;
        startLoop();
      };

      container.addEventListener("pointerenter", handlePointerEnter);
      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        destroyed = true;
        ro.disconnect();
        container.removeEventListener("pointerenter", handlePointerEnter);
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);
        if (rafId) cancelAnimationFrame(rafId);
        texture?.dispose();
        material?.dispose();
        geometry?.dispose();
        renderer?.dispose();
        try {
          renderer?.forceContextLoss?.();
        } catch {
          // ignore
        }
      };
    } catch {
      // Graceful fallback to static img
    }
  }, [member.image]);

  return (
    <article
      className="sea-team-card"
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      aria-label={`View architectural profile of ${member.name}, ${member.role}`}
    >
      <div className="sea-team-media" ref={containerRef}>
        <img
          src={member.image}
          alt={`Portrait of ${member.name}`}
          className="sea-team-img"
          loading="lazy"
          width={344}
          height={326}
        />
        <canvas className="sea-team-canvas" ref={canvasRef} aria-hidden="true" />
        <span className="sea-team-overlay-hint" aria-hidden="true">
          <span>View Profile</span>
        </span>
      </div>
      <div className="sea-team-meta">
        <h3 className="sea-team-name">{member.name}</h3>
        <p className="sea-team-role">{member.role}</p>
      </div>
    </article>
  );
}

export default function SeaTeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamPrincipal | null>(null);

  const closeModal = useCallback(() => {
    setSelectedMember(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (selectedMember) {
      window.addEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "";
    };
  }, [selectedMember, closeModal]);

  return (
    <section className="sea-team-section" aria-labelledby="sea-team-title">
      <div className="sea-team-inner">
        <div className="sea-team-header">
          <h2 id="sea-team-title">THE MINDS THAT MAKE SEAIPL</h2>
          <div className="sea-team-bar" aria-hidden="true" />
        </div>

        <div className="sea-team-grid" role="list">
          {PRINCIPALS.map((member) => (
            <TeamCardWebGL
              key={member.id}
              member={member}
              onSelect={() => setSelectedMember(member)}
            />
          ))}
        </div>
      </div>

      {/* Interactive Detail Modal on Selection */}
      {selectedMember && (
        <div
          className="sea-team-modal-backdrop"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="sea-team-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-member-name"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="sea-team-modal-close"
              onClick={closeModal}
              aria-label="Close profile details"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="sea-team-modal-content">
              <div className="sea-team-modal-photo">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  width={344}
                  height={326}
                />
              </div>
              <div className="sea-team-modal-body">
                <span className="sea-team-modal-badge">LEADERSHIP & ARCHITECTURE</span>
                <h3 id="modal-member-name">{selectedMember.name}</h3>
                <p className="sea-team-modal-role">{selectedMember.role}</p>

                <p className="sea-team-modal-bio">{selectedMember.bio}</p>

                <div className="sea-team-modal-details">
                  <div className="sea-team-modal-detail-row">
                    <Compass size={18} className="sea-team-modal-icon" aria-hidden="true" />
                    <div>
                      <strong>Specialization</strong>
                      <span>{selectedMember.specialization}</span>
                    </div>
                  </div>
                  <div className="sea-team-modal-detail-row">
                    <GraduationCap size={18} className="sea-team-modal-icon" aria-hidden="true" />
                    <div>
                      <strong>Education</strong>
                      <span>{selectedMember.education}</span>
                    </div>
                  </div>
                  <div className="sea-team-modal-detail-row">
                    <Award size={18} className="sea-team-modal-icon" aria-hidden="true" />
                    <div>
                      <strong>Key Projects</strong>
                      <span>{selectedMember.projects}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
