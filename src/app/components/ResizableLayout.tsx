"use client";

import React, { useState, useRef, useEffect, ReactNode, useCallback } from "react";

interface ResizableLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
  defaultLeftWidth?: number; // percentage
  minLeftWidth?: number; // percentage
  maxLeftWidth?: number; // percentage
}

function ResizableLayout({
  leftPanel,
  rightPanel,
  defaultLeftWidth = 60,
  minLeftWidth = 30,
  maxLeftWidth = 80,
}: ResizableLayoutProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Clamp the width between min and max
    const clampedWidth = Math.min(Math.max(newLeftWidth, minLeftWidth), maxLeftWidth);
    setLeftWidth(clampedWidth);
  }, [isDragging, minLeftWidth, maxLeftWidth]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("resizableLayoutLeftWidth", leftWidth.toString());
  }, [leftWidth]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("resizableLayoutLeftWidth");
    if (saved) {
      const savedWidth = parseFloat(saved);
      if (savedWidth >= minLeftWidth && savedWidth <= maxLeftWidth) {
        setLeftWidth(savedWidth);
      }
    }
  }, [minLeftWidth, maxLeftWidth]);

  return (
    <div 
      ref={containerRef}
      className="flex w-full h-full overflow-hidden relative"
      style={{ cursor: isDragging ? "col-resize" : "default" }}
    >
      {/* Left Panel */}
      <div 
        style={{ width: `${leftWidth}%` }}
        className="flex flex-col h-full overflow-hidden"
      >
        {leftPanel}
      </div>

      {/* Draggable Divider */}
      <div
        className={`w-1 bg-gray-300 hover:bg-gray-400 cursor-col-resize flex-shrink-0 relative group ${
          isDragging ? "bg-gray-400" : ""
        }`}
        onMouseDown={handleMouseDown}
      >
        {/* Visual indicator */}
        <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-gray-400 group-hover:bg-opacity-20 transition-colors" />
        
        {/* Drag handle dots */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex flex-col space-y-1">
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div 
        style={{ width: `${100 - leftWidth}%` }}
        className="flex flex-col h-full overflow-hidden"
      >
        {rightPanel}
      </div>
    </div>
  );
}

export default ResizableLayout; 