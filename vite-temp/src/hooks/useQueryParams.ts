import { useSearchParams } from 'react-router-dom';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const name = searchParams.get('name') || '';
  const status = searchParams.get('status') || undefined;

  function updateParams(params: {
    page?: number;
    name?: string;
    status?: string;
  }) {
    const newParams = new URLSearchParams(searchParams);

    if (params.page !== undefined)
      newParams.set('page', String(params.page));

    if (params.name !== undefined) {
      params.name
        ? newParams.set('name', params.name)
        : newParams.delete('name');
    }

    if (params.status !== undefined) {
      params.status
        ? newParams.set('status', params.status)
        : newParams.delete('status');
    }

    setSearchParams(newParams);
  }

  return {
    page,
    name,
    status,
    updateParams,
  };
}
