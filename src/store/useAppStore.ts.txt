"use client";

import { useEffect, useMemo, useState } from "react";
import { AppState, Scenario, ProgramProfile, ChildProfile, AgeBand } from "./schema";
import { loadState, saveState } from "./storage";
import { nanoid } from "../utils/nanoid";
import { makeDefaultScenario } from "../utils/defaultScenario";

type Actions = {
  setActiveScenario(id: string): void;
  addScenario(name?: string): void;
  renameScenario(id: string, name: string): void;
  deleteScenario(id: string): void;

  updateProgram(partial: Partial<ProgramProfile>): void;

  addChild(child: Omit<ChildProfile, "id">): void;
  updateChild(childId: string, partial: Partial<ChildProfile>): void;
  deleteChild(childId: string): void;
};

export function useAppStore(): AppState & { activeScenario: Scenario } & Actions {
  const [state, setState] = useState<AppState>(() => ({
    scenarios: [],
    activeScenarioId: ""
  }));

  // init from localStorage (client-only)
  useEffect(() => {
    const loaded = loadState();
    if (loaded && loaded.scenarios.length > 0) {
      setState(loaded);
      return;
    }
    const s1 = makeDefaultScenario("Scenario 1");
    setState({ scenarios: [s1], activeScenarioId: s1.id });
  }, []);

  // persist
  useEffect(() => {
    if (state.scenarios.length === 0) return;
    saveState(state);
  }, [state]);

  const activeScenario = useMemo(() => {
    const found = state.scenarios.find(s => s.id === state.activeScenarioId);
    return found ?? state.scenarios[0]!;
  }, [state]);

  const actions: Actions = {
    setActiveScenario(id) {
      setState(prev => ({ ...prev, activeScenarioId: id }));
    },
    addScenario(name = `Scenario ${state.scenarios.length + 1}`) {
      const next = makeDefaultScenario(name);
      setState(prev => ({
        scenarios: [...prev.scenarios, next],
        activeScenarioId: next.id
      }));
    },
    renameScenario(id, name) {
      setState(prev => ({
        ...prev,
        scenarios: prev.scenarios.map(s => (s.id === id ? { ...s, name, updatedAt: Date.now() } : s))
      }));
    },
    deleteScenario(id) {
      setState(prev => {
        const scenarios = prev.scenarios.filter(s => s.id !== id);
        const activeScenarioId =
          prev.activeScenarioId === id
            ? (scenarios[0]?.id ?? "")
            : prev.activeScenarioId;
        return { scenarios, activeScenarioId };
      });
    },
    updateProgram(partial) {
      setState(prev => ({
        ...prev,
        scenarios: prev.scenarios.map(s =>
          s.id === prev.activeScenarioId
            ? { ...s, program: { ...s.program, ...partial }, updatedAt: Date.now() }
            : s
        )
      }));
    },
    addChild(child) {
      setState(prev => ({
        ...prev,
        scenarios: prev.scenarios.map(s =>
          s.id === prev.activeScenarioId
            ? { ...s, children: [...s.children, { ...child, id: nanoid() }], updatedAt: Date.now() }
            : s
        )
      }));
    },
    updateChild(childId, partial) {
      setState(prev => ({
        ...prev,
        scenarios: prev.scenarios.map(s =>
          s.id === prev.activeScenarioId
            ? {
                ...s,
                children: s.children.map(c => (c.id === childId ? { ...c, ...partial } : c)),
                updatedAt: Date.now()
              }
            : s
        )
      }));
    },
    deleteChild(childId) {
      setState(prev => ({
        ...prev,
        scenarios: prev.scenarios.map(s =>
          s.id === prev.activeScenarioId
            ? { ...s, children: s.children.filter(c => c.id !== childId), updatedAt: Date.now() }
            : s
        )
      }));
    }
  };

  return { ...state, activeScenario, ...actions };
}
