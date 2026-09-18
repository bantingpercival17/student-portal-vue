export function setCache(key, value, ttl = 60000) {
    const cache = {
        value,
        expiresAt: Date.now() + ttl
    }

    localStorage.setItem(key, JSON.stringify(cache))
}

export function getCache(key) {
    const cached = localStorage.getItem(key)

    if (!cached) return null

    try {
        const cache = JSON.parse(cached)

        if (Date.now() > cache.expiresAt) {
            localStorage.removeItem(key)
            return null
        }

        return cache.value
    } catch (error) {
        localStorage.removeItem(key)
        return null
    }
}

export function removeCache(key) {
    localStorage.removeItem(key)
}

export function pushCache(key, value, ttl = 60000) {
    const cache = getCache(key) || {}

    setCache(key, {
        ...cache,
        ...value
    }, ttl)
}