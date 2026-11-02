export function DesignError({ error }: { error: Error }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'system-ui, sans-serif',
        padding: 24,
        textAlign: 'center',
      }}
    >
      <h1>Failed to load design</h1>
      <pre style={{ color: 'crimson' }}>{error.message}</pre>
    </div>
  );
}