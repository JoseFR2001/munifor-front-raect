const AdminStatistics = () => {
  return (
    <div className="min-h-screen w-full flex flex-row items-center justify-center gap-[2vw] flex-wrap bg-gray-300">
      <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-[92%] h-80">
        Chart 1
      </div>
      <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-1/2 h-80">
        Chart 2
      </div>
      <div className="bg-gray-100 rounded-lg shadow-lg p-4 w-2/5 h-80">
        Chart 3
      </div>
    </div>
  );
};

export default AdminStatistics;
