interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handlerSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;

    if (query.trim() === '') {
      return;
    }

    onSubmit(query);
  };

  return (
    <>
      <header>
        <div>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TMDB
          </a>
          <form action={handlerSubmit}>
            <input
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>
    </>
  );
}
