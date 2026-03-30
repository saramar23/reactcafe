import { useEffect, useState } from "react"

/**
 * "Uses TypeScript Generics to ensure type safety. By passing <T>, 
 * the hook knows exactly what data shape it’s storing (e.g., CartItem[]), 
 * preventing runtime errors when parsing JSON."
 * @template T - The type of the state being stored. T is generic so we don't have to write a separate hook for strings, numbers, or for objects.
 * @param key - The unique string key for localStorage.
 * @param initialValue: T  - The default value or a function that returns the default value.
 * Supports a functional initializer (() => T), only run once during the initial mount
 * @returns A stateful value and a function to update it, synced with localStorage.
 */
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {

    const [ value, setValue ] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if ( jsonValue != null ) 
            return JSON.parse(jsonValue)

        if ( typeof initialValue === "function" ) {
            return ( initialValue as () => T) ()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]
}