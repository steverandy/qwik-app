import {
  component$,
  Resource,
  useClientEffect$,
  useStore,
} from "@builder.io/qwik";
import { useEndpoint } from "@builder.io/qwik-city";

/**
 * Uses named layout `foo`
 */

export default component$(() => {
  const store = useStore({ timestamp: "" });
  const resource = useEndpoint();

  useClientEffect$(async () => {
    const url = `/api/builder.io/oss.json`;
    const rsp = await fetch(url);
    const data: any = await rsp.json();

    store.timestamp = data.timestamp;
  });

  return (
    <div>
      <h1>Qwik City Test API!</h1>

      <ul>
        <li>
          <a href="/api/builder.io/oss.json">/api/[org]/[user].json</a>
        </li>
        <li>
          <a href="/api/data.json">/api/data.json</a>
        </li>
      </ul>

      <Resource
        value={resource}
        onResolved={(data: any) => {
          console.log("data", data);
          return (
            <div>
              <p>Timestamp: {store.timestamp}</p>
              {data.map((item: any) => item)}
            </div>
          );
        }}
      />

      <div>
        <button
          class="bg-gray-200 p-2 rounded-md"
          onClick$={() => {
            fetch("/api", {
              method: "POST",
              headers: { accept: "application/json" },
            });
          }}
        >
          Test POST request
        </button>
      </div>
    </div>
  );
});

export let onGet = async () => {
  return [1, 2, 3];
};

export let onPost = async () => {
  return {};
};
