import {
    ChevronDownIcon,
    FunnelIcon,
    PlusIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../Button/Button";
import styles from "./filter.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import Dropdown from "../../Dropdown/Dropdown";

type Join = "AND" | "OR";

type FilterRow = {
    id: string;
    field: string;
    op: string;
    value: string;
};

type FilterGroup = {
    id: string;
    join: Join; // used for groups after the first (UI hides it for index 0)
    collapsed: boolean;
    filters: FilterRow[];
};

const uid = () => Math.random().toString(36).slice(2, 10);

export default function Filter() {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const fieldOptions = useMemo(() => ["Name", "Status", "Cost", "CreatedAt"], []);
    const operatorOptions = useMemo(
        () => ["equals", "not", "contains", "startsWith", "endsWith", "gt", "gte", "lt", "lte"],
        []
    );

    const [groups, setGroups] = useState<FilterGroup[]>([
        {
            id: uid(),
            join: "AND",
            collapsed: false,
            filters: [{ id: uid(), field: fieldOptions[0], op: operatorOptions[0], value: "" }],
        },
    ]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    function addGroup() {
        setGroups((prev) => [
            ...prev,
            {
                id: uid(),
                join: "AND",
                collapsed: false,
                filters: [{ id: uid(), field: fieldOptions[0], op: operatorOptions[0], value: "" }],
            },
        ]);
    }

    function deleteGroup(groupId: string) {
        setGroups((prev) => prev.filter((g) => g.id !== groupId));
    }

    function toggleCollapse(groupId: string) {
        setGroups((prev) =>
            prev.map((g) => (g.id === groupId ? { ...g, collapsed: !g.collapsed } : g))
        );
    }

    function setGroupJoin(groupId: string, join: Join) {
        setGroups((prev) => prev.map((g) => (g.id === groupId ? { ...g, join } : g)));
    }

    function addFilter(groupId: string) {
        setGroups((prev) =>
            prev.map((g) =>
                g.id === groupId
                    ? {
                        ...g,
                        collapsed: false,
                        filters: [
                            ...g.filters,
                            { id: uid(), field: fieldOptions[0], op: operatorOptions[0], value: "" },
                        ],
                    }
                    : g
            )
        );
    }

    function deleteFilter(groupId: string, filterId: string) {
        setGroups((prev) =>
            prev.map((g) =>
                g.id === groupId ? { ...g, filters: g.filters.filter((f) => f.id !== filterId) } : g
            )
        );
    }

    function updateFilter(groupId: string, filterId: string, patch: Partial<FilterRow>) {
        setGroups((prev) =>
            prev.map((g) =>
                g.id === groupId
                    ? {
                        ...g,
                        filters: g.filters.map((f) => (f.id === filterId ? { ...f, ...patch } : f)),
                    }
                    : g
            )
        );
    }

    function clearAll() {
        setGroups([]);
    }

    function apply() {
        // hook into your buildWhere(...) later
        console.log("APPLY FILTERS:", groups);
        setIsOpen(false);
    }

    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <Button
                iconOnly
                iconSize="xl"
                rounded={false}
                variant="foreground"
                onClick={() => setIsOpen((v) => !v)}
            >
                <FunnelIcon />
            </Button>

            {isOpen && (
                <div className={styles.filterContainer}>
                    <div className={styles.topRow}>
                        <Button variant="primary" onClick={addGroup}>
                            <PlusIcon />
                            Add Group
                        </Button>
                    </div>

                    {groups.length === 0 ? (
                        <div className={styles.empty}>No filters added yet.</div>
                    ) : (
                        <div className={styles.groups}>
                            {groups.map((group, index) => (
                                <div key={group.id} className={styles.group}>
                                    <div className={styles.filterGroupActions}>
                                        <div className={styles.filterGroupLeftActions}>
                                            <Button
                                                iconOnly
                                                iconSize="lg"
                                                variant="foreground"
                                                onClick={() => toggleCollapse(group.id)}
                                                aria-label="Collapse group"
                                            >
                                                <ChevronDownIcon
                                                    className={group.collapsed ? styles.chevCollapsed : styles.chevOpen}
                                                />
                                            </Button>

                                            {/* ✅ first group has no AND/OR dropdown */}
                                            {index > 0 && (
                                                <Dropdown
                                                    options={["AND", "OR"]}
                                                    value={group.join}
                                                    onChange={(v: string) => setGroupJoin(group.id, v as Join)}
                                                />
                                            )}

                                            <Button variant="foreground" onClick={() => addFilter(group.id)}>
                                                Add Filter ({group.filters.length})
                                            </Button>

                                            <Button variant="foreground" onClick={addGroup}>
                                                <PlusIcon />
                                                Add Group
                                            </Button>
                                        </div>

                                        <Button
                                            iconOnly
                                            iconSize="lg"
                                            variant="foreground"
                                            onClick={() => deleteGroup(group.id)}
                                            aria-label="Delete group"
                                        >
                                            <XMarkIcon />
                                        </Button>
                                    </div>

                                    {!group.collapsed && (
                                        <div className={styles.filterGroupContent}>
                                            {group.filters.map((f) => (
                                                <div key={f.id} className={styles.filterRow}>
                                                    <Dropdown
                                                        options={fieldOptions}
                                                        value={f.field}
                                                        onChange={(v: string) => updateFilter(group.id, f.id, { field: v })}
                                                    />

                                                    <Dropdown
                                                        options={operatorOptions}
                                                        value={f.op}
                                                        onChange={(v: string) => updateFilter(group.id, f.id, { op: v })}
                                                    />

                                                    <input
                                                        type="text"
                                                        placeholder="Value"
                                                        className={styles.filterInput}
                                                        value={f.value}
                                                        onChange={(e) =>
                                                            updateFilter(group.id, f.id, { value: e.target.value })
                                                        }
                                                    />

                                                    <Button
                                                        iconOnly
                                                        iconSize="lg"
                                                        variant="foreground"
                                                        onClick={() => deleteFilter(group.id, f.id)}
                                                        aria-label="Delete filter"
                                                    >
                                                        <XMarkIcon />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className={styles.bottomActions}>
                        <Button variant="foreground" onClick={clearAll}>
                            Clear Filters
                        </Button>
                        <Button variant="primary" onClick={apply} disabled={groups.length === 0}>
                            Apply Filters
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
