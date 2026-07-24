"use client";

/* eslint-disable @next/next/no-img-element -- The original certificate is pre-optimized and shared with the static build. */
import { motion } from "framer-motion";
import { Minus, Plus, RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type Certificate = {
  id: string;
  title: string;
  organization: string;
  completed: string;
  language: string;
  editionLabel: string;
  note: string;
  description: string;
  skills: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
};

type Props = {
  certificate: Certificate;
  onClose: () => void;
};

export default function CertificateModal({ certificate, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "+" || event.key === "=") setZoom((value) => Math.min(2.5, value + 0.25));
      if (event.key === "-") setZoom((value) => Math.max(0.75, value - 0.25));
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        className="certificate-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-title"
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.985 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
      >
        <div className="certificate-modal-bar glass">
          <div>
            <span>{certificate.editionLabel}</span>
            <strong id="certificate-title">{certificate.title}</strong>
          </div>
          <div className="zoom-controls" aria-label="Certificate zoom controls">
            <button className="icon-button" onClick={() => setZoom((value) => Math.max(0.75, value - 0.25))} aria-label="Zoom out">
              <Minus size={17} />
            </button>
            <output aria-live="polite">{Math.round(zoom * 100)}%</output>
            <button className="icon-button" onClick={() => setZoom((value) => Math.min(2.5, value + 0.25))} aria-label="Zoom in">
              <Plus size={17} />
            </button>
            <button className="icon-button" onClick={() => setZoom(1)} aria-label="Reset zoom">
              <RotateCcw size={16} />
            </button>
            <button ref={closeRef} className="icon-button" onClick={onClose} aria-label="Close certificate">
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="certificate-zoom-viewport">
          <div className="certificate-zoom-canvas" style={{ width: `${zoom * 100}%` }}>
            <img
              src={certificate.image}
              alt={`${certificate.title}, ${certificate.language} edition, issued to Serhii Kharyponchuk by ${certificate.organization}`}
              width={certificate.imageWidth}
              height={certificate.imageHeight}
              sizes="100vw"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
