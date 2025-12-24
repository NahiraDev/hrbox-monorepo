# RTK Query API Layer Documentation – HRLink Module

This document explains how the API layer is structured in the project using **Redux Toolkit Query (RTK Query)** with custom helpers. It covers how endpoints are defined, how data is fetched/mutated in components, and best practices for adding new endpoints or using existing ones.

## Core Concepts

- All APIs are defined as **modules** (e.g., `educationApi`, `awardApi`, etc.).
- Each module uses `createModuleApi` to set up a shared `baseUrl`, authentication, and auto-toasting.
- Endpoints are built using three helper functions:
  - `createQuery` → Simple GET requests (single item or non-paginated list).
  - `createPaginatedQuery` → GET requests that support pagination, search, sorting.
  - `createMutation` → POST / PUT / PATCH / DELETE for creating, editing, deleting.
- The API responses are wrapped in `{ data: {...}, msg: string | null, IsSucces: boolean }`.
- Successful mutations often return `data: null` but `IsSucces: true` with a message.
- Errors (`IsSucces: false`) are automatically handled as RTK Query errors (and toasted if `autoToast: true`).

## File Structure Overview

```
src/
├── core/
│   └── apis/
│       ├── baseApi.ts             → createModuleApi
│       ├── createBaseQuery.ts     → enhanced fetch (auth + toast)
│       └── createEndpoints.ts     → createQuery, createPaginatedQuery, createMutation
├── module/
│   └── hrlink/
│       └── app/
│           ├── endpoints.ts       → URL constants (HRLinkApiEndpoints)
│           └── apis/
│               ├── education.ts   → educationApi + endpoints
│               ├── award.ts       → similar for awards
│               └── ...            → other modules
```

## How Endpoints Are Defined (Example: education.ts)

```typescript
export const educationApiEndpoints = educationApi.injectEndpoints({
  endpoints: (build) => ({
    // Paginated list of educations
    fetchEducations: createPaginatedQuery<Education>(build, {
      url: HRLinkApiEndpoints.resume.education.getList,
      tags: ['Education'],
    }),

    // Single education detail – requires { id: number }
    fetchEducationDetail: createQuery<EducationDetail | null, { id: number }>(build, {
      url: HRLinkApiEndpoints.resume.education.getDetail,
      tags: ['Education'],
    }),

    // Universities – requires { type: number }, non-paginated full list
    fetchUniversity: createPaginatedQuery<University>(build, {
      url: HRLinkApiEndpoints.resume.education.getUniversity,
      tags: ['Education'],
      isPaginated: false, // treats response as full list
    }),

    // Mutations
    createEducation: createMutation<any, EducationPayload>(build, {
      url: HRLinkApiEndpoints.resume.education.create,
      method: 'POST',
      tags: ['Education'],
    }),

    editEducation: createMutation<any, EducationPayload & { Id: number }>(build, {
      url: HRLinkApiEndpoints.resume.education.edit,
      method: 'POST',
      tags: ['Education'],
    }),
  }),
});
```

Generated hooks are exported at the bottom:

```typescript
export const {
  useFetchEducationsQuery,
  useFetchEducationDetailQuery,
  useFetchUniversityQuery,
  useCreateEducationMutation,
  // ...
} = educationApiEndpoints;
```

## Using Hooks in Components/Pages

### 1. Paginated Queries (`use...Query`)

Supports automatic pagination params: `page`, `pageSize`, `search`, `sortBy`, `sortOrder` + any extra params.

```tsx
const [page, setPage] = useState(0);
const [search, setSearch] = useState('');

const { data, isLoading, isFetching, error } = useFetchEducationsQuery({
  page,
  pageSize: 10,
  search,               // optional
  sortBy: 'Title',      // optional
  sortOrder: 'asc',     // optional
});

if (isLoading) return <Loader />;
if (error) return <ErrorMessage error={error} />;

const { data: educations = [], meta } = data || {};

return (
  <>
    <input value={search} onChange={e => setSearch(e.target.value)} />
    <ul>
      {educations.map(edu => (
        <li key={edu.Id}>{edu.Title} - {edu.Degree}</li>
      ))}
    </ul>
    <div>
      Page {meta.page + 1} / {meta.totalPages} (Total: {meta.total})
    </div>
    <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>Prev</button>
    <button disabled={page + 1 >= meta.totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
  </>
);
```

### 2. Simple Queries with Required Parameters

```tsx
// Example: fetch single education
const { data: education, isLoading, error } = useFetchEducationDetailQuery(
  { id: 38805 }, 
  { skip: !educationId } // optional: skip if no id yet
);

if (isLoading) return <Loader />;
if (error) return <div>Not found or error</div>;
if (!education) return <div>No data</div>;

return <div>{education.Title}</div>;
```

### 3. Queries with Custom Parameters (e.g., type)

```tsx
// Get universities for a specific type
const { data } = useFetchUniversityQuery({ type: 1 });

const universities = data?.data || [];
```

### 4. Mutations (Create / Edit / Delete)

Mutations return `[trigger, result]` tuple.

```tsx
const [createEducation, { isLoading: isCreating }] = useCreateEducationMutation();
const [editEducation, { isLoading: isEditing }] = useEditEducationMutation();
const [deleteEducation] = useDeleteEducationMutation();

const handleSave = async () => {
  try {
    if (isEditMode) {
      await editEducation({ ...formData, Id: currentId }).unwrap();
    } else {
      await createEducation(formData).unwrap();
    }
    // Success toast shown automatically (autoToast: true)
    // List will auto-refetch because of tag invalidation
  } catch (err: any) {
    // Error toast shown automatically
    console.error(err.data?.msg || 'Error');
  }
};

const handleDelete = async () => {
  if (confirm('Delete?')) {
    await deleteEducation({ id: currentId }).unwrap();
  }
};
```

**Note**: The payload you pass to the mutation is sent as JSON body automatically.

Example payload for a location edit (in another module):

```tsx
await editLocation({
  Address: "کرج",
  Long: 35.81149,
  Lat: 51.38437
}).unwrap();
```

## Adding a New Endpoint

1. Add URL to `endpoints.ts` (e.g., `HRLinkApiEndpoints.resume.education.newEndpoint`).
2. In the relevant API file (e.g., `education.ts`):

```typescript
newEndpoint: createQuery<ReturnType, ParamType>(build, {
  url: HRLinkApiEndpoints.resume.education.newEndpoint,
  tags: ['Education'],
}),
// OR for paginated
newPaginated: createPaginatedQuery<ItemType>(build, {
  url: ...,
  tags: ['Education'],
  isPaginated: false, // if not paginated
}),
// OR for mutation
createSomething: createMutation<any, PayloadType>(build, {
  url: ...,
  method: 'POST',
  tags: ['Education'],
}),
```

3. Export the new hook:

```typescript
export const {
  // ...
  useNewEndpointQuery,
  useNewPaginatedQuery,
  useCreateSomethingMutation,
} = educationApiEndpoints;
```

4. Use in component as shown above.

## Tips & Best Practices

- Always define proper TypeScript generics (`<DataType>`, `<ParamType>`) for better autocomplete and safety.
- Use `tags` consistently (e.g., `['Education']`) so mutations automatically invalidate and refetch lists.
- For endpoints requiring specific params (like `{ id }` or `{ type }`), always pass them as an object to the hook.
- Use `{ skip: true }` option on queries when params are not ready yet.
- Errors and success messages are auto-toasted thanks to `autoToast: true` in `createModuleApi`.
- Check console logs in `createEndpoints.ts` during development (they log params and raw responses).

This setup keeps API code clean, reusable, and consistent across the entire HRLink module.
