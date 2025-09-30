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
  const [lastId, setLastId] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reqIdRef = useRef(0);

  const extractResults = (data) => {
    if (Array.isArray(data)) return data;
    return data?.results ?? data?.items ?? data?.data ?? data?.profiles ?? [];
  };

  const load = useCallback(
    async (cursor) => {
      if (loading) return 0;
      setLoading(true);
      setError(null);
      const rid = ++reqIdRef.current;

      const last_id = typeof cursor === "number" ? cursor : lastId;

      try {
        const raw = await search(last_id, pageSize);

        if (rid !== reqIdRef.current) return 0;

        const items = extractResults(raw).map(mapItem);

        setPeople((prev) => {
          const seen = new Set(prev.map((p) => String(p.id)));
          const merged = prev.concat(items.filter((p) => !seen.has(String(p.id))));
          return merged;
        });

        if (items.length > 0) {
          const newLastId = Number(items[items.length - 1].id) || last_id;
          setLastId(newLastId);
        }

        setHasMore(items.length >= pageSize);

        return items.length;
      } catch (e) {
        if (rid === reqIdRef.current) setError(e);
        return 0;
      } finally {
        if (rid === reqIdRef.current) setLoading(false);
      }
    },
    [pageSize, mapItem, lastId, loading]
  );

  const loadMore = useCallback(() => load(lastId), [load, lastId]);

  const reload = useCallback(async () => {
    reqIdRef.current++;
    setPeople([]);
    setLastId(0);
    setHasMore(true);
    setError(null);
    return load(0); 
  }, [load]);

  const depsKey = JSON.stringify(deps);
  const lastRunKeyRef = useRef(null);
  useEffect(() => {
    if (lastRunKeyRef.current === depsKey) return;
    lastRunKeyRef.current = depsKey;
    reload();
  }, [depsKey, reload]);

  return { people, loading, error, hasMore, loadMore, reload, setPeople };
}
