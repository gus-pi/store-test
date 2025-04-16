const SideBar = () => {
  return (
    <div className="h-[calc(100vh-2rem)] w-full max-w-[15rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <ul className="my-5 flex flex-col gap-2">
        <li>Categories</li>
        <li>
          <input type="text" placeholder="Search" />
        </li>
        <li>Price range</li>
      </ul>
    </div>
  );
};
export default SideBar;
