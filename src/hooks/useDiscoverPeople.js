import { useCallback, useEffect, useRef, useState } from "react";
import { search } from "@/services/matchesService";

function defaultMapItem(x) {
  return {
    id: x.id,
    full_name: x.full_name,
    age: x.age,
    city: x.city,     
    distance: x.distance ?? 0,
    is_verified: x.is_verified ?? false,
    is_vip: x.is_vip ?? false,
    similarity: x.similarity ?? 0,
    interests: x.interests ?? [],
  };
}

export function useDiscoverPeople({
  pageSize = 10,
  deps = [],
  mapItem = defaultMapItem,
} = {}) {
  const [people, setPeople] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reqIdRef = useRef(0);

  const extractResults = (data) => {
    if (Array.isArray(data)) return data;
    return (data?.results ?? data?.items ?? data?.data ?? []);
  };

  const load = useCallback(
    async (start) => {
      if (loading) return 0;
      setLoading(true);
      setError(null);
      const rid = ++reqIdRef.current;

      try {
        const raw = await search(start, pageSize);
        if (rid !== reqIdRef.current) return 0;

        const items = extractResults(raw).map(mapItem);
        setPeople((prev) => {
          const seen = new Set(prev.map((p) => String(p.id)));
          const merged = prev.concat(items.filter((p) => !seen.has(String(p.id))));
          return merged;
        });

        setOffset(start + items.length);
        setHasMore(items.length >= pageSize);
        return items.length;
      } catch (e) {
        if (rid === reqIdRef.current) setError(e);
        return 0;
      } finally {
        if (rid === reqIdRef.current) setLoading(false);
      }
    },
    [pageSize, mapItem, loading]
  );

  const loadMore = useCallback(() => load(offset), [load, offset]);
  const reload = useCallback(async () => {
    reqIdRef.current++;
    setPeople([]);
    setOffset(0);
    setHasMore(true);
    setError(null);
    return load(0);
  }, [load]);

  useEffect(() => {
    reload();
  }, deps); 

  return { people, loading, error, hasMore, loadMore, reload, setPeople };
}
