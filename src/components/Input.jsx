export default function Input({ searchBar, callback, handleSubmit }) {
  return (
    <>
      <input
        type={'text'}
        placeholder={'Search By Name'}
        value={searchBar}
        onChange={(e) => callback(e.target.value)}
      ></input>
      <button onClick={handleSubmit}>Search</button>
    </>
  );
}
