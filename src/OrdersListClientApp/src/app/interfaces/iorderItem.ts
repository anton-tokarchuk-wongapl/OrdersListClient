export interface IOrderItem
{
    orderId: number;
    productId: number;
    productName: string;
    productPrice: number;
    productPhoto: string;
    statusId: number;
    statusName: string;
    count: number;
}