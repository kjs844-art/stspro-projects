// Tweaks panel for v2

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "rotationSpeed": 6,
  "showLabels": true,
  "showWhirl": true,
  "showGraticule": true,
  "fillCountries": true,
  "showLogos": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    window.__TWEAKS = { ...window.__TWEAKS, ...t };
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Globe" />
      <TweakSlider
        label="Rotation speed"
        value={t.rotationSpeed}
        min={0} max={30} step={0.5}
        unit="°/s"
        onChange={(v) => setTweak('rotationSpeed', v)}
      />
      <TweakToggle label="Graticule" value={t.showGraticule} onChange={(v) => setTweak('showGraticule', v)} />
      <TweakToggle label="Country fills" value={t.fillCountries} onChange={(v) => setTweak('fillCountries', v)} />

      <TweakSection label="Markers" />
      <TweakToggle label="City + index labels" value={t.showLabels} onChange={(v) => setTweak('showLabels', v)} />

      <TweakSection label="Decoration" />
      <TweakToggle label="Whirl rings" value={t.showWhirl} onChange={(v) => setTweak('showWhirl', v)} />
      <TweakToggle label="Company logos marquee" value={t.showLogos} onChange={(v) => setTweak('showLogos', v)} />
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks-mount'));
root.render(<App />);
