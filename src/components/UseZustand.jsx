import React from 'react'
import { create } from 'zustand'

const UseZustand = create((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: Math.min(state.bears + 1, 10), })),
    decrease: () => set((state) => ({ bears: Math.max(state.bears - 1, 0), })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: Math.min(Math.max(newBears, 0), 10) }),
}))

export default UseZustand