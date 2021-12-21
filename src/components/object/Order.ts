
export interface Order {
    OrderID: string;
    AreaID: string;
    OrderDate: string;
    OrderType: number;
    OrderNumber: number;
    OrderCode: string;
    OrderName: string;
    OrderPhone: string;
    Amount: number;
    DepositAmount: number;
    DiscountPercent: number;
    DiscountAmount: number;
    TaxAmount: number;
    TotalAmount: number;
    PayAmount: number;
    TransactionID: string;
    Notes: string;
    IsPrinted: boolean;
    PrintCount: number;
    Status: number;
    isActive?: boolean;
    CustomerName: string

}

export interface AreaList {
    AreaID: string;
    Notes: string;
    IsActive: boolean;
    AreaType: number;
    HasHourMoney: boolean;
    UserName: string;
    FullName: string;
    LayoutName: string;
    LayoutID: string;
    Active?: boolean;
}
export interface TableList {
    LayoutID: string;
    TableID: string;
    Caption: string;
    Status: number;
    OpenTime: string;
    TransactionID: string;
    isMerge?: boolean;
}
export interface MenuList {
    MenuID: string;
    MenuCode: string;
    MenuName: string;
    CreatedDate: string;
    CreatedBy: string;
    MenuType: string;
    IsActive: string;
    SearchString: string;
    Show?: boolean;
}
export interface GroupList {
    MenuID: string;
    CategoryID: string;
    CategoryCode: string;
    CategoryName: string;
    Quantity: string;
    SortOrder: string;
    isShow?: boolean;
}
export interface FoodList {
    MenuID: string;
    CategoryID: string;
    FoodID: string;
    FoodCode: string;
    FoodName: string;
    UnitName: string;
    Price: string;
    SortOrder: string;
    Color: string;
    SearchString: string;
}
export interface OrderDetailList {
    DetailID: string;
    OrderID: string;
    FoodID: string;
    FoodCode: string;
    FoodName: string;
    Quantity: number;
    QuantityOrg: number;
    StandardCost: string;
    Price: number;
    Amount: number;
    FCAmount: number;
    TaxPercent: number;
    TaxAmount: number;
    DiscountPercent: number;
    DiscountAmount: number;
    TotalAmount: number;
    IsTakeAway: boolean;
    IsComment: boolean;
    Status: number;
    IsAutoAdd: boolean;
    ItemType: number;
    isActive?: boolean;
    Notes: string;
    CommentText: string;
    IsPast: boolean
}
export interface CommentList {
    FoodID: string;
    CommentID: string;
    CommentName: string;
    Level1: string;
    Level2: string;
    Level3: string;
    LevelDefault: number;
    IsActive: boolean;
    CommentText: string;
    CommentLevel: number;
}
export interface TableMergeList {
    TableMergeID: string;
    TransactionID: string;
    TableID: string;
    TableCaption: string;
    isActive?: boolean;
}
export interface List {
    Text: string
}
export interface PaymentInfo {
    PaymentID: string,
    OrderID: string,
    PaymentMethodID: number,
    PaymentBy: string,
    PaymentAmount: string,
    Notes: string
}
export interface ReservationList {
    ReservationID: string;
    CreatedDate: string;
    Status: number;
    VisitedDate: string;
    Persons: number;
    CustomerID: string;
    CustomerName: string;
    CustomerPhone: string;
    UpdateDate: string;
    CancelationBy?: string;
    CancelationDate: string;
    CancelationNote: string;
    Notes: string;
    SearchString: string;
    isActive?: boolean
}


