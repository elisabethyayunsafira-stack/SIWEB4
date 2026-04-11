// Loading skeleton components for PrimeLog Fleet

const shimmerStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
  borderRadius: 3,
};

export function TableRowSkeleton() {
  return (
    <tr>
      {[22, 28, 18, 20, 12].map((w, i) => (
        <td key={i} style={{ padding: "18px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ ...shimmerStyle, height: 12, width: `${w * 0.6}%` }} />
        </td>
      ))}
    </tr>
  );
}

export function FleetTableSkeleton() {
  return (
    <div style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
      <div style={{ padding: "12px 18px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between" }}>
        <div style={{ ...shimmerStyle, height: 12, width: 140 }} />
        <div style={{ ...shimmerStyle, height: 10, width: 160 }} />
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {Array.from({ length: 4 }).map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AlertCardSkeleton() {
  return (
    <div style={{ padding: "10px 14px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ ...shimmerStyle, height: 10, width: 120 }} />
        <div style={{ ...shimmerStyle, height: 8, width: 60 }} />
      </div>
      <div style={{ ...shimmerStyle, height: 10, width: "100%", marginBottom: 5 }} />
      <div style={{ ...shimmerStyle, height: 10, width: "80%" }} />
    </div>
  );
}

export function FuelChartSkeleton() {
  return (
    <div style={{ padding: "12px 14px 8px", display: "flex", alignItems: "flex-end", gap: 6, height: 110 }}>
      {[52, 70, 45, 88, 95, 65, 60].map((h, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${h}%`,
            ...shimmerStyle,
            borderRadius: "2px 2px 0 0",
          }}
        />
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div style={{ padding: 10, display: "grid", gridTemplateColumns: "1fr 280px", gap: 10 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <FleetTableSkeleton />
        <div style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, height: 260, ...shimmerStyle }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
          <AlertCardSkeleton />
          <AlertCardSkeleton />
        </div>
        <div style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, flex: 1 }}>
          <FuelChartSkeleton />
        </div>
      </div>
    </div>
  );
}
