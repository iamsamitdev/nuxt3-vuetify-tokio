<script setup lang="ts">

  import EditData from "@/components/tables/EditData"
  import useStrapiApi from "@/composables/useStrapiApi"

  definePageMeta({
    layout: "backend",
  })

  useHead({
    title: 'Product',
    meta: [
      { 
        name: 'keywords', 
        content: 'Product, Nuxt 3, Backend'
      },
      {
        name: 'Description',
        content: 'Product Nuxt 3,  IT Genius Engineering'
      }
    ]
  })

  const dialog = ref(false);
  const search = ref("");
  const desserts = ref(EditData);
  const editedIndex = ref(-1);

  function close() {
    dialog.value = false;
    setTimeout(() => {
    }, 300);
  }

  //Methods
  const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
      return user.userinfo.toLowerCase().includes(search.value.toLowerCase());
    })
  });

  //Computed Property
  const formTitle = computed(() => {
    return editedIndex.value === -1 ? "New Product" : "Edit Product";
  })

  // Pagination =======
  const initPage = ref(1)

  // Call Products API
  const { data: products } = await useStrapiApi().getAllProducts(initPage.value, 25)

  console.log(products)

  // สร้างตัวแปรเพื่อเก็บค่า page ที่เลือก
  const page:any = ref(products.value?.meta.pagination.page)

  // สร้างตัวแปรเพื่อเก็บค่าจำนวนหน้าทั้งหมด
  const pageCount = ref(products.value?.meta.pagination.pageCount)

  // สร้างฟังก์ชันเพื่อเปลี่ยนหน้า
  const handlePageChange = async (page: any) => {
    initPage.value = page
    // สั่งให้โหลดข้อมูลใหม่
    const { data: newproducts } = await useStrapiApi().getAllProducts(initPage.value, 25)
    products.value = newproducts.value
  }

  // ดึงค่า root path จากไฟล์ .env
  const config = useRuntimeConfig()
  const STRAPI_URL_ROOT: string = config.public.urlroot

  // Extract Text from Rich Text
  function extractText(richText: { children: any[]; }[]) {
    return richText.map((paragraph: { children: any[]; }) => 
      paragraph.children.map((child: { text: any; }) => child.text).join(' ')
    ).join('\n')
  }

</script>

<template>
  <v-row>
    <v-col cols="12" sm="12">
      <v-card>
        <v-card-text class="pa-5">
          
          <v-row>
            <v-col cols="12" lg="4" md="6">
              <v-text-field
                density="compact"
                v-model="search"
                label="Search Products"
                hide-details
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="8" md="6" class="text-right">

              <!-- Add Product Diaglog -->
              <v-dialog v-model="dialog">
                <template v-slot:activator="{ props }">
                  <v-btn color="primary" v-bind="props" class="ml-auto">
                    <MIcon name="ph:plus" /> Add Product
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="pa-4 bg-secondary">
                    <span class="title text-white">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-form ref="form">
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              label="Id"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              label="User info"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              label="User email"
                              type="email"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              label="Phone"
                              type="phone"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              label="Joining Date"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              label="Role"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>

                  <v-card-actions class="pa-4">
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="close">Cancel</v-btn>
                    <v-btn
                      color="secondary"
                      variant="elevated"
                      >Save</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-col>
          </v-row>

          <!-- แสดงเลขหน้า -->
          <v-pagination 
            v-model="page" 
            :length="pageCount"
            next-icon="mdi-chevron-right"
            prev-icon="mdi-chevron-left"
            @next="handlePageChange"
            @prev="handlePageChange"
            @update:modelValue="handlePageChange">
          </v-pagination>

          <v-table class="mt-5">

            <thead>
              <tr>
                <th>Id</th>
                <th>ProductInfo</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="product in products?.data" :key="product.id">
                <td>{{ product.id }}</td>
                <td>
                  <div class="d-flex align-center py-4">

                    <div v-if="product.attributes.image.data">
                      <v-img
                        :src="`${STRAPI_URL_ROOT}${product.attributes.image.data[0].attributes.url}`"
                        width="50px"
                        class="rounded-circle img-fluid"
                      ></v-img>
                    </div>
                    <div v-else>
                      <v-icon size="50">mdi-image</v-icon>
                    </div>

                    <div class="ml-5">
                      <h2 class="my-2">{{ product.attributes.title }}</h2>
                      <span 
                        v-if="product.attributes.description"
                        class="d-block font-weight-regular">
                        {{ extractText(product.attributes.description).slice(0, 150)}}
                      </span>
                    </div>
                  </div>
                </td>
                <td>{{ product.attributes.price }}</td>
                <td>{{ product.attributes.qty }}</td>
                <td>
                  <v-icon
                    small
                    class="mr-2 text-info cursor-pointer"
                    title="Edit"
                    >mdi-pencil</v-icon
                  >
                  <v-icon
                    small
                    class="text-error cursor-pointer"
                    title="Delete"
                    >mdi-delete</v-icon
                  >
                </td>
              </tr>
            </tbody>
            
          </v-table>

        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped></style>