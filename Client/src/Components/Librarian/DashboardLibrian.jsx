import React from 'react';

const DashboardLibrian = () => {
  // Mock data for books and categories
  const recommendedBooks = [
    {
      title: 'The Psychology of Money',
      image: 'https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UY327_FMwebp_QL65_.jpg',
    },
    {
      title: 'Company of One',
      image: 'https://m.media-amazon.com/images/I/81asA46xUNL._AC_UF1000,1000_QL80_.jpg',
    },
    {
      title: 'How Innovation Works',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhwWfYfinnb9aWaxiSxJ_L_8t4hlJYEU_8Vw&s',
    },
    
    {
        title: 'Ratan Tata',
        image: 'https://cdn.ibpbooks.com/images/sdf/ratan-tata-a-life.jpg',
      },
      {
        title: 'Sachin Tendulkar',
        image: 'https://cdn01.sapnaonline.com/product_media/9781473605176/md_9781473605176.jpg',
      },
  ];

  const categories = [
    {
      title: 'Money/Investing',
      image: 'https://m.media-amazon.com/images/I/81pQvzfA-AS._AC_UF1000,1000_QL80_.jpg',
    },
    {
      title: 'Design',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHQYvhEeMt03Hmj2eCYI7CxqO-LKuijK_5ku6Hti5fcxx6--QJcIg_qeVly-sNEA1HVAs&usqp=CAU',
    },
    {
        title: 'Nature',
        image: 'https://m.media-amazon.com/images/I/81Hy+fwC6mL._AC_UF1000,1000_QL80_.jpg',
      },
    
    {
        title: 'Science',
        image: 'https://images.squarespace-cdn.com/content/v1/5877ca6986e6c00f05f58f84/1616529078025-0H8KYK9YHKLBA3O5EHQN/the-science-of-science-cover.jpg',
      },
  ];

  return (
    <div className="p-8">
      {/* Book Recommendation Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Book Recommendation</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {recommendedBooks.map((book, index) => (
            <div key={index} className="min-w-[150px]">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="mt-2 text-center text-sm">{book.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Book Category Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Book Category</h2>
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="text-center">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="mt-2 text-sm font-medium">{category.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLibrian;
