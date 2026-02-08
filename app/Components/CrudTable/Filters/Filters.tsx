"use client";

import React, { useMemo, useState } from "react";

type Conjunction = "AND" | "OR";
type Operator = "equals" | "not_equals" | "gt" | "gte" | "lt" | "lte" | "contains";

type FilterRow = {
    id: string;
    field: string;
    operator: Operator;
    value: string;
};

type Group = {
    id: string;
    collapsed: boolean;
    conjunction: Conjunction;
    filters: FilterRow[];
};

const FIELDS = ["cost", "name", "status", "createdAt"] as const;

function uid(prefix = "id") {
    return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now().toString(36)}`;
}

export default function Filters({ isOpen }: { isOpen: boolean }) {
    const [groups, setGroups] = useState<Group[]>([]);

    const hasAnything = useMemo(() => groups.length > 0 && groups.some((g) => g.filters.length > 0), [groups]);

    function addGroup() {
        setGroups((prev) => [
            ...prev,
            {
                id: uid("group"),
                collapsed: false,
                conjunction: "AND",
                filters: [],
            },
        ]);
    }

    function addGroupAfter(groupId: string) {
        setGroups((prev) => {
            const idx = prev.findIndex((g) => g.id === groupId);
            const next = [...prev];
            const newGroup: Group = { id: uid("group"), collapsed: false, conjunction: "AND", filters: [] };
            next.splice(idx >= 0 ? idx + 1 : next.length, 0, newGroup);
            return next;
        });
    }

    function deleteGroup(groupId: string) {
        setGroups((prev) => prev.filter((g) => g.id !== groupId));
    }

    function toggleGroup(groupId: string) {
        setGroups((prev) =>
            prev.map((g) => (g.id === groupId ? { ...g, collapsed: !g.collapsed } : g)),
        );
    }

    function setGroupConjunction(groupId: string, conj: Conjunction) {
        setGroups((prev) => prev.map((g) => (g.id === groupId ? { ...g, conjunction: conj } : g)));
    }

    function addFilter(groupId: string) {
        setGroups((prev) =>
            prev.map((g) =>
                g.id === groupId
                    ? {
                        ...g,
                        filters: [
                            ...g.filters,
                            {
                                id: uid("filter"),
                                field: FIELDS[0],
                                operator: "equals",
                                value: "",
                            },
                        ],
                    }
                    : g,
            ),
        );
    }

    function updateFilter(groupId: string, filterId: string, patch: Partial<FilterRow>) {
        setGroups((prev) =>
            prev.map((g) => {
                if (g.id !== groupId) return g;
                return {
                    ...g,
                    filters: g.filters.map((f) => (f.id === filterId ? { ...f, ...patch } : f)),
                };
            }),
        );
    }

    function deleteFilter(groupId: string, filterId: string) {
        setGroups((prev) =>
            prev.map((g) => (g.id === groupId ? { ...g, filters: g.filters.filter((f) => f.id !== filterId) } : g)),
        );
    }

    function clearAll() {
        setGroups([]);
    }

    function applyFilters() {
        // Replace with your real action (server action, query build, API call, etc.)
        const payload = groups.map((g) => ({
            id: g.id,
            conjunction: g.conjunction,
            filters: g.filters.map(({ id, field, operator, value }) => ({ id, field, operator, value })),
        }));
        console.log("APPLY FILTERS:", payload);
        alert("Check console for the generated filter payload.");
    }

    return (
        <div style={styles.wrap}>
            <div style={styles.topRow}>
                <button style={styles.primaryBtn} onClick={addGroup}>
                    + Add group
                </button>
            </div>

            <div style={styles.groups}>
                {groups.length === 0 ? (
                    <div style={styles.empty}>No groups yet. Click “Add group”.</div>
                ) : (
                    groups.map((group) => (
                        <div key={group.id} style={styles.groupCard}>
                            {/* Group header row (4 items in the row + delete icon at end) */}
                            <div style={styles.groupHeaderRow}>
                                {/* 1) collapsible icon */}
                                <button
                                    style={styles.iconBtn}
                                    onClick={() => toggleGroup(group.id)}
                                    aria-label={group.collapsed ? "Expand group" : "Collapse group"}
                                    title={group.collapsed ? "Expand" : "Collapse"}
                                >
                                    {group.collapsed ? "▸" : "▾"}
                                </button>

                                {/* 2) dropdown AND/OR */}
                                <select
                                    style={styles.select}
                                    value={group.conjunction}
                                    onChange={(e) => setGroupConjunction(group.id, e.target.value as Conjunction)}
                                    aria-label="Group conjunction"
                                >
                                    <option value="AND">AND</option>
                                    <option value="OR">OR</option>
                                </select>

                                {/* 3) add filter button (with count) */}
                                <button style={styles.btn} onClick={() => addFilter(group.id)}>
                                    + Add filter ({group.filters.length})
                                </button>

                                {/* 4) add group button (next to it) */}
                                <button style={styles.btn} onClick={() => addGroupAfter(group.id)}>
                                    + Add group
                                </button>

                                {/* X delete group icon */}
                                <button
                                    style={{ ...styles.iconBtn, marginLeft: "auto" }}
                                    onClick={() => deleteGroup(group.id)}
                                    aria-label="Delete group"
                                    title="Delete group"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Filters */}
                            {!group.collapsed && (
                                <div style={styles.filtersArea}>
                                    {group.filters.length === 0 ? (
                                        <div style={styles.emptySmall}>No filters in this group.</div>
                                    ) : (
                                        group.filters.map((f) => (
                                            <div key={f.id} style={styles.filterRow}>
                                                {/* field */}
                                                <select
                                                    style={styles.select}
                                                    value={f.field}
                                                    onChange={(e) => updateFilter(group.id, f.id, { field: e.target.value })}
                                                    aria-label="Field"
                                                >
                                                    {FIELDS.map((field) => (
                                                        <option key={field} value={field}>
                                                            {field}
                                                        </option>
                                                    ))}
                                                </select>

                                                {/* operator */}
                                                <select
                                                    style={styles.select}
                                                    value={f.operator}
                                                    onChange={(e) => updateFilter(group.id, f.id, { operator: e.target.value as Operator })}
                                                    aria-label="Operator"
                                                >
                                                    <option value="equals">equals</option>
                                                    <option value="not_equals">not equals</option>
                                                    <option value="gt">&gt;</option>
                                                    <option value="gte">&gt;=</option>
                                                    <option value="lt">&lt;</option>
                                                    <option value="lte">&lt;=</option>
                                                    <option value="contains">contains</option>
                                                </select>

                                                {/* value */}
                                                <input
                                                    style={styles.input}
                                                    value={f.value}
                                                    onChange={(e) => updateFilter(group.id, f.id, { value: e.target.value })}
                                                    placeholder="Value…"
                                                    aria-label="Value"
                                                />

                                                {/* delete filter */}
                                                <button
                                                    style={styles.iconBtn}
                                                    onClick={() => deleteFilter(group.id, f.id)}
                                                    aria-label="Delete filter"
                                                    title="Delete filter"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Bottom buttons */}
            <div style={styles.bottomRow}>
                <button style={styles.btn} onClick={clearAll} disabled={!hasAnything && groups.length === 0}>
                    Clear filters
                </button>
                <button style={styles.primaryBtn} onClick={applyFilters} disabled={groups.length === 0}>
                    Apply filters
                </button>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    wrap: {
        maxWidth: 980,
        maxHeight: "70vh",
        overflow: 'scroll',
        margin: "0 auto",
        padding: 16,
    },
    topRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 },
    groups: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 },
    groupCard: {
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 12,
        background: "rgba(255,255,255,0.04)",
        overflow: "hidden",
    },
    groupHeaderRow: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: 10,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
    },
    filtersArea: { padding: 10, display: "flex", flexDirection: "column", gap: 8 },
    filterRow: { display: "flex", alignItems: "center", gap: 8 },
    btn: {
        padding: "8px 10px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.06)",
        cursor: "pointer",
    },
    primaryBtn: {
        padding: "8px 12px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.12)",
        cursor: "pointer",
        fontWeight: 600,
    },
    iconBtn: {
        width: 34,
        height: 34,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.06)",
        cursor: "pointer",
        flex: "0 0 auto",
    },
    select: {
        height: 34,
        padding: "0 10px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(0,0,0,0.25)",
        outline: "none",
    },
    input: {
        height: 34,
        padding: "0 10px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(0,0,0,0.25)",
        outline: "none",
        width: 220,
    },
    bottomRow: { display: "flex", justifyContent: "flex-end", gap: 8 },
    empty: {
        padding: 14,
        border: "1px dashed rgba(255,255,255,0.18)",
        borderRadius: 12,
        background: "rgba(255,255,255,0.03)",
    },
    emptySmall: { fontSize: 13 },
};
