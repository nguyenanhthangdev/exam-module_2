document.addEventListener('DOMContentLoaded', () => {
    // Dữ liệu mẫu
    const categories = {
        "Quả Táo": {
            "image": "images/category1.jpg",
            "items": ["images/image2.jpg", "images/image3.jpg", "images/image4.jpg"]
        },
        "Quả Xoài": {
            "image": "images/category2.jpg",
            "items": ["images/image6.jpg", "images/image7.jpg"]
        },
        "Sầu Riêng": {
            "image": "images/category3.jpg",
            "items": ["images/image9.jpg", "images/image10.jpg", "images/image11.jpg"]
        },
        "Quả Cam": {
            "image": "images/category4.jpg",
            "items": ["images/image13.jpg", "images/image14.jpg", "images/image15.jpg"]
        }
    };

    // Lưu dữ liệu vào Local Storage nếu chưa tồn tại
    if (!localStorage.getItem('categories')) {
        localStorage.setItem('categories', JSON.stringify(categories));
    }

    // Load dữ liệu từ Local Storage
    const storedCategories = JSON.parse(localStorage.getItem('categories'));

    const categoryList = document.getElementById('category-list');
    const imageGallery = document.getElementById('image-gallery');

    // Hiển thị danh sách loại bên trái
    for (let category in storedCategories) {
        const categoryData = storedCategories[category];
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'category-item', 'd-flex', 'align-items-center');
        listItem.setAttribute('data-category', category); // Gán thuộc tính dữ liệu để truy cập

        const imgElement = document.createElement('img');
        imgElement.src = categoryData.image;
        imgElement.alt = category;

        const nameElement = document.createElement('span');
        nameElement.textContent = category;

        listItem.appendChild(imgElement);
        listItem.appendChild(nameElement);

        listItem.addEventListener('click', () => {
            showImages(storedCategories[category].items);
        });

        categoryList.appendChild(listItem);
    }

    // Hiển thị hình ảnh tương ứng bên phải
    function showImages(images) {
        imageGallery.innerHTML = ''; // Xóa nội dung cũ

        if (Array.isArray(images) && images.length > 0) {
            images.forEach(image => {
                const colDiv = document.createElement('div');
                colDiv.classList.add('col-md-4');

                const imgElement = document.createElement('img');
                imgElement.src = image;
                imgElement.alt = "Image";
                imgElement.onerror = () => {
                    console.error(`Failed to load image: ${image}`);
                    imgElement.src = 'images/placeholder.jpg'; // Hiển thị hình ảnh dự phòng nếu không tải được
                };

                colDiv.appendChild(imgElement);
                imageGallery.appendChild(colDiv);
            });
        } else {
            imageGallery.innerHTML = '<p>No images available for this category.</p>';
        }
    }

    // Hiển thị hình ảnh của loại đầu tiên khi trang được load
    const firstCategory = Object.keys(storedCategories)[0];
    if (firstCategory) {
        showImages(storedCategories[firstCategory].items);
    }
});
