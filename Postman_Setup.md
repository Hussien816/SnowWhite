# Adding Multiple Images to Product via Postman

To add multiple images when creating a product using Postman, follow these steps:

1. **Set Request Type**: 
   - Change the request type to `POST`.

2. **Enter URL**: 
   - Use the endpoint for creating a product, e.g., `http://localhost:5037/api/products`.

3. **Select Body Tab**: 
   - Click on the "Body" tab.

4. **Choose form-data**: 
   - Select the `form-data` option.

5. **Add Product Fields**:
   - Add the following fields:
     - **Key**: `productName` | **Value**: Your product name
     - **Key**: `description` | **Value**: Your product description
     - **Key**: `price` | **Value**: Your product price
     - **Key**: `categoryId` | **Value**: Your product category ID
     - **Key**: `sizes` | **Value**: (Add multiple entries for sizes, e.g., `Small`, `Medium`)
     - **Key**: `quantities` | **Value**: (Add corresponding quantities for each size)

6. **Add Images**:
   - For each image you want to upload, add a new key:
     - **Key**: `images` (this should be used instead of `images[]`)
     - **Type**: File
     - **Value**: Select the image file from your computer.

7. **Send Request**:
   - Click the "Send" button to submit the request.

### Example Setup in Postman
| Key          | Value                | Type  |
|--------------|----------------------|-------|
| productName  | Sample Product       | Text  |
| description  | This is a sample.    | Text  |
| price        | 19.99                | Text  |
| categoryId   | 1                    | Text  |
| sizes        | Small                | Text  |
| sizes        | Medium               | Text  |
| quantities   | 10                   | Text  |
| quantities   | 5                    | Text  |
| images       | (Select image file)  | File  |
| images       | (Select another file) | File  |

This setup will allow you to create a product with multiple images successfully.
