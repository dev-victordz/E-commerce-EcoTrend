function getProductIdFromURL() {
      const params = new URLSearchParams(window.location.search);
      return params.get('id');
  }
  
  // Função para carregar os detalhes do produto
  function loadProductDetails() {
      fetch('../../products.json')
          .then(response => response.json())
          .then(products => {
              const productId = getProductIdFromURL();
              const product = products.find(p => p.id == productId);
  
              if (product) {
                const imgSlider = document.querySelector('.carousel-inner');
                const productTitle = document.getElementById('productNameTitle');
                const price1 = document.getElementById('labelPrice1');
                const price2 = document.getElementById('labelPrice2');
                const type = document.getElementById('typeTag');
                const marca = document.getElementById('marcaTag');
                const category = document.getElementById('categoryTag');
                const description = document.getElementById('productDescription')
                document.title = product.nome

                imgSlider.innerHTML = '';

                product.img.forEach((imgSrc, index) => {
                    const activeClass = index === 0 ? 'active' : ''; // A primeira imagem deve ser "active"
                    const item = `
                        <div class="carousel-item ${activeClass}">
                            <img class="d-block w-100" src="${imgSrc}" alt="Imagem ${index + 1}">
                        </div>
                    `;
                    imgSlider.innerHTML += item; // Adiciona cada item ao carousel
                });

                productTitle.innerText = product.nome;
                price1.innerText = "R$"+product.preco;
                price2.innerText = "R$"+(product.preco/12).toFixed(2);
                type.innerText = product.tipo;
                marca.innerText = product.marca;
                category.innerText = product.categoria;
                description.innerText = product.descricao

              }
          })
          .catch(error => console.error('Error loading product details:', error));
  }

window.onload = loadProductDetails;

function selectRadio(value) {
    document.getElementById('radio' + value).checked = true;
}