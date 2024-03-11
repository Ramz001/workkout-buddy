import WorkoutsContainer from "../../components/WorkoutsContainer/WorkoutsContainer";

const Home = () => {
  return (
    <main
      className="dark:bg-slate-800 bg-slate-50 px-4 sm:px-6 md:px-16 py-6 
    sm:py-8 max-w-[1920px]  md:min-h-max 2xl:min-h-[92vh] mx-auto"
    >
      <WorkoutsContainer />
    </main>
  );
};

export default Home;
