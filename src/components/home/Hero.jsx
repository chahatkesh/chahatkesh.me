import React, { useState, useRef, useEffect } from "react";

const DraggableNote = ({
  content,
  bgColor,
  initialRotate,
  initialPosition,
  isMobile,
  icon,
  darkText,
  index,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const noteRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  // Add animation entrance effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300 + index * 150); // Stagger the entrance of notes

    return () => clearTimeout(timer);
  }, [index]);

  // Update position when initialPosition changes (for responsive layout)
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  // Handle mouse events
  const handleMouseDown = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (noteRef.current) {
      const rect = noteRef.current.getBoundingClientRect();
      offsetRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault && e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      setPosition({
        x: clientX - offsetRef.current.x,
        y: clientY - offsetRef.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={noteRef}
      className={`absolute cursor-move ${
        isDragging ? "z-30" : "z-20"
      } transition-all`}
      style={{
        backgroundColor: bgColor,
        transform: `rotate(${initialRotate}) scale(${isDragging ? 1.05 : 1})`,
        left: `${position.x}px`,
        top: `${position.y}px`,
        padding: `${
          icon ? "1.5rem 1.25rem 1.75rem" : "1.25rem 1.25rem 1.75rem"
        }`,
        borderRadius: "3px", // Smaller corner radius for more realism
        boxShadow: isDragging
          ? "0 14px 24px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.12)"
          : "0 8px 16px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)",
        transition:
          "box-shadow 0.3s ease, transform 0.2s ease, opacity 0.5s ease",
        userSelect: "none",
        touchAction: "none",
        width: isMobile ? "90px" : "130px",
        fontSize: isMobile ? "12px" : "14px",
        border: "1px solid rgba(0,0,0,0.03)",
        position: "absolute",
        backgroundImage: `
          linear-gradient(to bottom, ${bgColor}, ${bgColor}),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")
        `,
        transformOrigin: "center center",
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0)" : "blur(4px)",
        // Add animation for entrance effect
        animation: isVisible ? `noteEntrance 0.6s ease forwards` : "none",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onMouseOver={(e) => {
        if (!isDragging) {
          e.currentTarget.style.transform = `rotate(${initialRotate}) scale(1.03)`;
        }
      }}
      onMouseOut={(e) => {
        if (!isDragging) {
          e.currentTarget.style.transform = `rotate(${initialRotate}) scale(1)`;
        }
      }}>
      <div
        className={`relative z-20 text-[9px] md:text-sm font-medium text-center ${
          darkText ? "text-[#333333]" : ""
        }`}
        style={{
          fontFamily: "Delius, cursive, sans-serif",
          textShadow: "0.3px 0.3px 0px rgba(0,0,0,0.05)",
          lineHeight: "1.3",
        }}>
        {icon && <div className="text-xl md:text-2xl mb-1">{icon}</div>}
        {content}
      </div>

      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/png;base64,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')",
          borderRadius: "3px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Realistic sticky note top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-8"
        style={{
          background: `linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)`,
          borderTopLeftRadius: "3px",
          borderTopRightRadius: "3px",
        }}
      />

      {/* Tape effect on top of all notes */}
      <div
        className="absolute w-12 h-5 -top-3 left-1/2 transform -translate-x-1/2"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          opacity: 0.8,
          borderRadius: "1px",
          transform: `translateX(-50%) rotate(${Math.random() * 6 - 3}deg)`,
        }}
      />

      {/* Sticky note realistic peel/curl effect at the corner */}
      <div
        className="absolute bottom-0 right-0 w-1/6 h-1/6 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 45%, rgba(0,0,0,0.09) 50%, ${bgColor} 55%, ${bgColor} 100%)`,
          borderBottomRightRadius: "3px",
          boxShadow: "3px 3px 5px rgba(0,0,0,0.06) inset",
          transform: isDragging ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.2s ease",
        }}
      />
    </div>
  );
};

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const heroRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Add animation CSS to head
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes noteEntrance {
        0% { 
          opacity: 0;
          transform: translateY(30px) rotate(0deg) scale(0.8);
          filter: blur(4px);
        }
        60% {
          opacity: 1;
          filter: blur(0px);
        }
        100% { 
          opacity: 1;
          transform: translateY(0) rotate(var(--rotate)) scale(1);
          filter: blur(0);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Define sticky notes with separate mobile and desktop positions
  const stickyNotes = [
    {
      id: 1,
      content: "Full Stack Developer",
      icon: "💻",
      bgColor: "#fff3cc",
      rotate: "4deg",
      position: {
        mobile: { x: 40, y: 120 },
        desktop: { x: 150, y: 220 },
      },
      darkText: true,
    },
    {
      id: 2,
      content: "Available for hire",
      icon: "✅",
      bgColor: "#d4f9db",
      rotate: "-3deg",
      position: {
        mobile: { x: 90, y: 480 },
        desktop: { x: windowSize.width - 250, y: 350 },
      },
      darkText: true,
    },
    {
      id: 3,
      content: "2+ years experience",
      icon: "🏆",
      bgColor: "#ffd5d5",
      rotate: "5deg",
      position: {
        mobile: { x: 210, y: 480 },
        desktop: { x: 200, y: 400 },
      },
      darkText: true,
    },
    {
      id: 4,
      content: "UX/UI specialist",
      icon: "🎨",
      bgColor: "#d5e8ff",
      rotate: "-5deg",
      position: {
        mobile: { x: 250, y: 100 },
        desktop: { x: windowSize.width - 300, y: 160 },
      },
      darkText: true,
    },
    {
      id: 5,
      content: "Let's connect!",
      icon: "👋",
      bgColor: "#f9e0ff",
      rotate: "-2deg",
      position: {
        mobile: { x: 60, y: 320 },
        desktop: { x: windowSize.width - 200, y: 280 },
      },
      darkText: true,
    },
    {
      id: 6,
      content: "Building for Impact",
      icon: "⚛️",
      bgColor: "#ffe8d4",
      rotate: "6deg",
      position: {
        mobile: { x: 160, y: 200 },
        desktop: { x: 300, y: 150 },
      },
      darkText: true,
    },
  ];

  // Filter sticky notes for mobile devices
  const visibleStickyNotes = isMobile
    ? stickyNotes.filter((note) => [2, 3].includes(note.id))
    : stickyNotes;

  return (
    <section
      ref={heroRef}
      className="py-20 px-4 md:py-40 md:px-12 lg:px-24 mx-auto relative flex items-center justify-center min-h-[90vh] overflow-hidden">
      {/* Dot background pattern */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "radial-gradient(#e0e0e0 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="flex flex-col items-center text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#37352f] leading-tight mb-3">
          Hi, I'm Chahat Kesharwani
        </h1>

        <p className="text-lg md:text-xl text-[#6b6b6b] font-light">
          Full Stack Developer & UX/UI Designer
        </p>
      </div>

      {/* Draggable sticky notes */}
      {visibleStickyNotes.map((note, index) => (
        <DraggableNote
          key={note.id}
          id={note.id}
          content={note.content}
          bgColor={note.bgColor}
          initialRotate={note.rotate}
          initialPosition={
            isMobile ? note.position.mobile : note.position.desktop
          }
          isMobile={isMobile}
          icon={note.icon}
          darkText={note.darkText}
          index={index}
        />
      ))}
    </section>
  );
};

export default Hero;
