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
        skybox-image="3dmodels/farm.hdr" 
        poster="3dmodels/chameleon.webp" 
        shadow-intensity="1" 
        camera-controls 
        touch-action="pan-y"
        skybox-height="0m"
        camera-orbit="auto 90deg auto"
        min-camera-orbit="-45deg 60deg auto" 
        max-camera-orbit="45deg 120deg auto"
        auto-rotate
        style={{ 
          width: '100%', 
          height: '500px',
          border: '1px solid #ccc',
          borderRadius: "0 2em 2em 2em", }}>

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
