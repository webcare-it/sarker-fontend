export const CategoriesFooter = () => {
  const shopCategories = [
    { name: "Furniture", href: "#" },
    { name: "Outdoor", href: "#" },
    { name: "Bedding & Bath", href: "#" },
    { name: "Rugs", href: "#" },
    { name: "Decor & Pillows", href: "#" },
    { name: "Lighting", href: "#" },
    { name: "Kitchen", href: "#" },
    { name: "Appliances", href: "#" },
  ];
  return (
    <div>
      <h4 className="text-white font-bold text-lg mb-4">Shop by Category</h4>
      <ul className="space-y-2">
        {shopCategories?.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className="hover:text-primary/70 transition-colors text-sm">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
