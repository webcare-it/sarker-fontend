export const CardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid grid-cols-1 gap-3 md:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-4 md:mx-0">
      {children}
    </section>
  );
};
