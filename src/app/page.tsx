"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import {
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Share2,
  Download,
  Building2,
  Factory,
  HardHat,
  Shirt,
  Tractor,
  Mountain,
  Truck,
  Store,
  User,
} from "lucide-react";

/* ─── Constants ─── */
const WS_LUIS = "56991387669";
const WS_MARIO = "56999988360";
const WS_DEFAULT_MSG = encodeURIComponent(
  "Hola, vengo desde la página web de Roseg. Me interesa cotizar."
);

const BANK = {
  banco: "BCI / MACHBANK",
  tipo: "Cuenta Corriente",
  cuenta: "76502546",
  rut: "76.132.115-3",
  titular: "Paredes Y Baglietto LTDA.",
};

const MAPS_EMBED =
  "https://www.google.com/maps?q=Carrera+444,La+Calera,Chile&output=embed";
const MAPS_ROUTE =
  "https://www.google.com/maps/dir/?api=1&destination=Carrera+444,La+Calera,Chile";

const CATEGORIES = [
  {
    title: "Bordado Industrial",
    desc: "Personalización de prendas con nuestras 4 bordadoras industriales",
    img: "/images/inicio_showslider_28112023143604.webp",
    icon: Shirt,
  },
  {
    title: "Ropa Corporativa",
    desc: "Polerones, poleras, chaquetas y más para tu equipo",
    img: "/images/inicio_showslider_28112023143456.webp",
    icon: User,
  },
  {
    title: "Equipamiento de Seguridad",
    desc: "Calzado, lentes, cascos y protección personal",
    img: "/images/inicio_showslider_28112023172152.webp",
    icon: HardHat,
  },
  {
    title: "Nuestra Sede",
    desc: "Visítanos en Carrera 444, La Calera, V Región",
    img: "/images/inicio_showslider_28112023132453.webp",
    icon: Building2,
  },
];

const SECTORS = [
  { name: "Industria", icon: Factory },
  { name: "Construcción", icon: Building2 },
  { name: "Agricultura", icon: Tractor },
  { name: "Vialidad", icon: Truck },
  { name: "Minería", icon: Mountain },
  { name: "Comercio", icon: Store },
];

const FAQ = [
  {
    q: "¿Hacen envíos a regiones?",
    a: "Sí, realizamos envíos a todo Chile. Consulta por el costo de envío según tu ubicación.",
  },
  {
    q: "¿Cuál es el mínimo de prendas para bordado?",
    a: "Trabajamos desde cantidades mínimas según el tipo de prenda y diseño. Contáctanos para conocer los detalles.",
  },
  {
    q: "¿Cuánto demora la entrega?",
    a: "Depende del producto y la cantidad. Las prendas con bordado tienen un tiempo de producción adicional. Te informamos el plazo al momento de la cotización.",
  },
  {
    q: "¿Aceptan transferencia bancaria?",
    a: "Sí, aceptamos transferencia BCI / MACHBANK. Los datos están disponibles en esta página para copiar fácilmente.",
  },
];

const VCARD = `BEGIN:VCARD
VERSION:3.0
FN:Roseg Seguridad Industrial
ORG:Roseg Seguridad Industrial LTDA.
TEL;TYPE=CELL,WORK:+56991387669
TEL;TYPE=CELL,WORK:+56999988360
TEL;TYPE=WORK,VOICE:+56332227195
EMAIL:rosegltda@gmail.com
URL:https://rosegseguridad.cl
ADR;TYPE=WORK:;;Carrera 444;La Calera;;;Chile
NOTE:Seguridad Industrial, Ropa Corporativa, Bordado Industrial, EPP
X-SOCIALPROFILE;TYPE=instagram:https://instagram.com/rosegltda
X-SOCIALPROFILE;TYPE=facebook:https://facebook.com/rosegltda
END:VCARD`;

/* ─── Copy Button ─── */
function CopyBtn({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ title: `${label} copiado` });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "No se pudo copiar", variant: "destructive" });
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-xs text-roseg-gray hover:text-roseg-red transition-colors shrink-0"
      aria-label={`Copiar ${label}`}
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copiado" : "Copiar"}
    </button>
  );
}

/* ─── Section Title ─── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-roseg-gray text-center mb-2">
      {children}
    </h2>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    mensaje: "",
  });
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const buildWAMessage = useCallback(() => {
    const parts = [
      `*Nueva solicitud de cotización*`,
      ``,
      `Nombre: ${formData.nombre || "No indicado"}`,
      formData.empresa ? `Empresa: ${formData.empresa}` : "",
      formData.telefono ? `Teléfono: ${formData.telefono}` : "",
      formData.mensaje ? `Necesita: ${formData.mensaje}` : "",
      ``,
      `Enviado desde rosegseguridad.cl`,
    ];
    return parts.filter(Boolean).join("\n");
  }, [formData]);

  const handleSubmitWA = () => {
    const msg = encodeURIComponent(buildWAMessage());
    window.open(`https://wa.me/${WS_LUIS}?text=${msg}`, "_blank");
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(buildWAMessage());
      toast({ title: "Mensaje copiado. Pégalo en WhatsApp." });
    } catch {
      toast({ title: "No se pudo copiar", variant: "destructive" });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "Roseg Seguridad Industrial",
      text: "Conoce Roseg Seguridad Industrial - Ropa corporativa, EPP y bordado industrial",
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        toast({ title: "Link copiado al portapapeles" });
      }
    } catch {
      // User cancelled or not supported
    }
  };

  const handleDownloadVCard = () => {
    const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "roseg.vcf";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Contacto descargado" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ─── HEADER STICKY ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          headerScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img
              src="/images/logo-optimized.png"
              alt="Roseg Seguridad Industrial"
              className="h-10 w-auto"
            />
          </a>
          <Button
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="bg-roseg-red hover:bg-roseg-red-dark text-white font-semibold text-sm px-4 md:px-6"
          >
            <MessageCircle className="w-4 h-4 mr-1.5" />
            Cotizar
          </Button>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* ─── HERO ─── */}
        <section className="relative bg-roseg-gray text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/images/inicio_showslider_28112023143604.webp')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32 text-center">
            <img
              src="/images/logo-optimized.png"
              alt="Roseg Seguridad Industrial"
              className="h-24 md:h-32 mx-auto mb-6 drop-shadow-lg"
            />
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              Seguridad Industrial
              <br />
              <span className="text-roseg-red-light">con identidad propia</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Ropa corporativa, EPP, bordado y estampado industrial.
              <br className="hidden md:block" />
              Soluciones integrales para proteger a tu equipo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${WS_LUIS}?text=${WS_DEFAULT_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold text-base px-8 py-6 w-full sm:w-auto"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Cotizar por WhatsApp
                </Button>
              </a>
              <a href={MAPS_ROUTE} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 font-semibold text-base px-8 py-6 w-full sm:w-auto"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Ver ubicación
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* ─── CATEGORÍAS ─── */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <SectionTitle>¿Qué hacemos?</SectionTitle>
            <p className="text-center text-roseg-gray-light mb-10 max-w-xl mx-auto">
              Soluciones integrales en seguridad industrial y ropa corporativa
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.title}
                  className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={cat.img}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{cat.title}</h3>
                    <p className="text-sm text-gray-300">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTORES ─── */}
        <section className="py-12 bg-roseg-gray-lighter">
          <div className="max-w-6xl mx-auto px-4">
            <SectionTitle>Sectores que servimos</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-8">
              {SECTORS.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.name}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-full bg-roseg-red/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-roseg-red" />
                    </div>
                    <span className="text-sm font-medium text-roseg-gray">
                      {s.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── FORMULARIO DE COTIZACIÓN ─── */}
        <section ref={formRef} className="py-16 md:py-20 bg-white" id="cotizar">
          <div className="max-w-2xl mx-auto px-4">
            <SectionTitle>Solicitar cotización</SectionTitle>
            <p className="text-center text-roseg-gray-light mb-8">
              Cuéntanos qué necesitas y te responderemos a la brevedad
            </p>
            <div className="bg-roseg-gray-lighter rounded-xl p-6 md:p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, nombre: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input
                    id="empresa"
                    placeholder="Nombre de la empresa"
                    value={formData.empresa}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, empresa: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  type="tel"
                  placeholder="+56 9 XXXX XXXX"
                  value={formData.telefono}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, telefono: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mensaje">¿Qué necesitas?</Label>
                <Textarea
                  id="mensaje"
                  rows={4}
                  placeholder="Ej: 20 polerones con bordado del logo, talles S y M..."
                  value={formData.mensaje}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, mensaje: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleSubmitWA}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-5"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Enviar por WhatsApp
                </Button>
                <Button
                  onClick={handleCopyMessage}
                  variant="outline"
                  className="flex-1 border-roseg-gray/20 py-5"
                >
                  <Copy className="w-5 h-5 mr-2" />
                  Copiar mensaje
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── HORARIO ─── */}
        <section className="py-10 bg-roseg-gray-lighter">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm">
              <Clock className="w-5 h-5 text-roseg-red" />
              <span className="font-semibold text-roseg-gray text-sm md:text-base">
                Lun–Jue 08:30–17:30 | Vie 08:30–16:00
              </span>
            </div>
          </div>
        </section>

        {/* ─── CONTACTO + VCARD ─── */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <SectionTitle>Contacto</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* WhatsApp */}
              <div className="bg-roseg-gray-lighter rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-lg text-roseg-gray flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  WhatsApp
                </h3>
                <a
                  href={`https://wa.me/${WS_LUIS}?text=${WS_DEFAULT_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                >
                  <div>
                    <p className="font-semibold text-roseg-gray">Luis Paredes</p>
                    <p className="text-sm text-roseg-gray-light">+56 9 9138 7669</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-roseg-gray-light group-hover:text-roseg-red transition-colors" />
                </a>
                <a
                  href={`https://wa.me/${WS_MARIO}?text=${WS_DEFAULT_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                >
                  <div>
                    <p className="font-semibold text-roseg-gray">
                      Mario Baglietto
                    </p>
                    <p className="text-sm text-roseg-gray-light">
                      +56 9 9998 8360
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-roseg-gray-light group-hover:text-roseg-red transition-colors" />
                </a>
              </div>

              {/* Otros contactos + vCard */}
              <div className="bg-roseg-gray-lighter rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-lg text-roseg-gray flex items-center gap-2">
                  <Phone className="w-5 h-5 text-roseg-red" />
                  Otros medios
                </h3>
                <a
                  href="tel:+56332227195"
                  className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                >
                  <div>
                    <p className="font-semibold text-roseg-gray">Teléfono</p>
                    <p className="text-sm text-roseg-gray-light">
                      (33) 222 7195
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-roseg-gray-light group-hover:text-roseg-red transition-colors" />
                </a>
                <a
                  href="mailto:rosegltda@gmail.com"
                  className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                >
                  <div>
                    <p className="font-semibold text-roseg-gray">Email</p>
                    <p className="text-sm text-roseg-gray-light">
                      rosegltda@gmail.com
                    </p>
                  </div>
                  <Mail className="w-5 h-5 text-roseg-gray-light group-hover:text-roseg-red transition-colors" />
                </a>
                <Button
                  onClick={handleDownloadVCard}
                  variant="outline"
                  className="w-full border-roseg-gray/20 py-5 font-semibold"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Guardar contacto en mi teléfono
                </Button>
              </div>

              {/* Redes sociales */}
              <div className="md:col-span-2 bg-roseg-gray-lighter rounded-xl p-6">
                <h3 className="font-bold text-lg text-roseg-gray mb-4 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-roseg-red" />
                  Redes Sociales
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://facebook.com/rosegltda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow font-medium text-roseg-gray"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </a>
                  <a
                    href="https://instagram.com/rosegltda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow font-medium text-roseg-gray"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="url(#ig-grad)"><defs><linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor="#FD5"/><stop offset="50%" stopColor="#FF543E"/><stop offset="100%" stopColor="#C837AB"/></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    Instagram
                  </a>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1 border-roseg-gray/20 font-semibold"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Compartir
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── DATOS BANCARIOS ─── */}
        <section className="py-16 md:py-20 bg-roseg-gray-lighter">
          <div className="max-w-2xl mx-auto px-4">
            <SectionTitle>Datos para transferencia</SectionTitle>
            <p className="text-center text-roseg-gray-light mb-8">
              BCI / MACHBANK — Copia los datos que necesites
            </p>
            <div className="bg-white rounded-xl p-6 space-y-3">
              {(
                [
                  ["Banco", BANK.banco],
                  ["Tipo de cuenta", BANK.tipo],
                  ["N° de cuenta", BANK.cuenta],
                  ["RUT", BANK.rut],
                  ["Titular", BANK.titular],
                ] as const
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-2 border-b border-roseg-gray-lighter last:border-0"
                >
                  <div>
                    <p className="text-xs text-roseg-gray-light uppercase tracking-wide">
                      {label}
                    </p>
                    <p className="font-semibold text-roseg-gray">{value}</p>
                  </div>
                  <CopyBtn text={value} label={label} />
                </div>
              ))}
              <div className="pt-2">
                <Button
                  onClick={async () => {
                    const all = `Banco: ${BANK.banco}\nTipo: ${BANK.tipo}\nCuenta: ${BANK.cuenta}\nRUT: ${BANK.rut}\nTitular: ${BANK.titular}`;
                    try {
                      await navigator.clipboard.writeText(all);
                      toast({ title: "Todos los datos copiados" });
                    } catch {
                      toast({
                        title: "No se pudo copiar",
                        variant: "destructive",
                      });
                    }
                  }}
                  variant="outline"
                  className="w-full border-roseg-gray/20 font-semibold"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar todos los datos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── MAPA ─── */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <SectionTitle>Nuestra ubicación</SectionTitle>
            <p className="text-center text-roseg-gray-light mb-8">
              Carrera 444, La Calera, V Región, Chile
            </p>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={MAPS_EMBED}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Roseg Seguridad Industrial"
                className="w-full"
              />
            </div>
            <div className="text-center mt-4">
              <a
                href={MAPS_ROUTE}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="border-roseg-gray/20 font-semibold"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Abrir en Google Maps con ruta
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-16 md:py-20 bg-roseg-gray-lighter">
          <div className="max-w-2xl mx-auto px-4">
            <SectionTitle>Preguntas frecuentes</SectionTitle>
            <Accordion type="single" collapsible className="mt-8">
              {FAQ.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-semibold text-roseg-gray hover:text-roseg-red transition-colors">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-roseg-gray-light">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ─── QR CODE ─── */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-md mx-auto px-4 text-center">
            <SectionTitle>Escanea y comparte</SectionTitle>
            <p className="text-roseg-gray-light mb-6">
              Escanea este código desde tu teléfono para acceder a esta página
            </p>
            <QRCodeWithLogo url={typeof window !== "undefined" ? window.location.href : "https://rosegseguridad.cl"} />
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-roseg-gray text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-2 text-sm">
          <p className="font-semibold text-white">
            Roseg Seguridad Industrial LTDA.
          </p>
          <p>Carrera 444, La Calera, V Región, Chile</p>
          <p>RUT: 76.132.115-3</p>
          <p className="pt-2 text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Roseg Seguridad Industrial. Todos
            los derechos reservados.
          </p>
        </div>
      </footer>

      {/* ─── BOTONES FLOTANTES WHATSAPP ─── */}
      <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3">
        <a
          href={`https://wa.me/${WS_LUIS}?text=${WS_DEFAULT_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full pl-3 pr-4 py-2.5 shadow-lg hover:shadow-xl transition-all group"
          aria-label="WhatsApp Luis"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="hidden sm:inline text-sm font-medium">Luis</span>
        </a>
        <a
          href={`https://wa.me/${WS_MARIO}?text=${WS_DEFAULT_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full pl-3 pr-4 py-2.5 shadow-lg hover:shadow-xl transition-all group"
          aria-label="WhatsApp Mario"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="hidden sm:inline text-sm font-medium">Mario</span>
        </a>
      </div>
    </div>
  );
}

/* ─── QR CODE COMPONENT ─── */
function QRCodeWithLogo({ url }: { url: string }) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const QRCode = (await import("qrcode")).default;
        const canvas = document.createElement("canvas");
        await QRCode.toCanvas(canvas, url, {
          width: 280,
          margin: 1,
          color: {
            dark: "#1a1a1a",
            light: "#ffffff",
          },
          errorCorrectionLevel: "H",
        });

        // Draw logo in center
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const logo = new Image();
          logo.crossOrigin = "anonymous";
          logo.src = "/images/logo-optimized.png";
          logo.onload = () => {
            const size = 50;
            const x = (canvas.width - size) / 2;
            const y = (canvas.height - size) / 2;
            // White background for logo
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.roundRect(x - 4, y - 4, size + 8, size + 8, 6);
            ctx.fill();
            ctx.drawImage(logo, x, y, size, size);
            setQrDataUrl(canvas.toDataURL("image/png"));
          };
          // Fallback if image doesn't load
          logo.onerror = () => {
            setQrDataUrl(canvas.toDataURL("image/png"));
          };
        }
      } catch (err) {
        console.error("QR generation failed:", err);
      }
    };
    generateQR();
  }, [url]);

  if (!qrDataUrl) {
    return (
      <div className="w-[280px] h-[280px] mx-auto bg-roseg-gray-lighter rounded-xl animate-pulse" />
    );
  }

  return (
    <div className="inline-block">
      <canvas ref={canvasRef} className="hidden" />
      <img
        src={qrDataUrl}
        alt="Código QR Roseg Seguridad Industrial"
        className="w-[280px] h-[280px] mx-auto rounded-xl shadow-md"
      />
    </div>
  );
}