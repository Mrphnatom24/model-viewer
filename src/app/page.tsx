// app/page.tsx
"use client";
export default function Home() {
  const ModelViewer = 'model-viewer' as any;

  return (
    <main style={{ padding: 40 }}>
      <h1>Demo model-viewer en Next.js App Router + TypeScript</h1>
      <ModelViewer 
        alt="Chameleon" 
        src="3dmodels/chameleon.glb" 
        ar 
        environment-image="3dmodels/farm.hdr" 
        poster="3dmodels/chameleon.webp" 
        shadow-intensity="1" 
        camera-controls 
        touch-action="pan-y"
        style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}
      >
        <div className="progress-bar hide" slot="progress-bar">
          <div className="update-bar"></div>
        </div>
        <button slot="ar-button" id="ar-button">
          View in your space
        </button>
        <div id="ar-prompt">
          <img src="https://modelviewer.dev/shared-assets/icons/hand.png" alt="hand icon" />
        </div>

      </ModelViewer>
    </main>
  )
}
