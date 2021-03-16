interface ProductCreateDto {
    code: string;
    name: string;
    user_id: number;
    status: boolean;
}

interface ProductUpdateDto {
   
    status: boolean;
}

export {
    ProductCreateDto,
    ProductUpdateDto
}