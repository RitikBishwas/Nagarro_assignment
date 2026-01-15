

-- QUERY 1: Display the Name and Color of the Product with the maximum weight
-- Schema(s) involved: Production.Product
SELECT TOP 1
    Name,
    Color
FROM Production.Product
ORDER BY Weight DESC;


-- QUERY 2: Display Description and MaxQty fields from the SpecialOffer table
-- Some of the MaxQty values are NULL, in this case display the value 0.00 instead
-- Schema(s) involved: Sales.SpecialOffer
SELECT 
    Description,
    ISNULL(MaxQty, 0.00) AS MaxQty
FROM Sales.SpecialOffer;


-- QUERY 3: Display the FirstName and LastName of records from the Person table 
-- where FirstName contains the letters 'ss'
-- Display an additional column with sequential numbers for each row returned beginning at integer 1
-- Schema(s) involved: Person

SELECT 
    ROW_NUMBER() OVER (ORDER BY BusinessEntityID) AS RowNumber,
    FirstName,
    LastName
FROM Person.Person
WHERE FirstName LIKE '%ss%';


-- QUERY 4: Display the ProductId of the product with the second largest stock level
-- Schema(s) involved: Production.Product
 
-- SELECT 
--     ProductID
-- FROM Production.Product
-- ORDER BY StockLevel DESC
-- OFFSET 1 ROWS FETCH NEXT 1 ROWS ONLY;
SELECT ProductID
FROM Production.ProductInventory
GROUP BY ProductID
ORDER BY SUM(Quantity) DESC
OFFSET 1 ROWS FETCH NEXT 1 ROWS ONLY;



-- QUERY 5: Create a stored procedure that accepts the name of a product 
-- and displays its ID, number, and availability
-- Schema(s) involved: Production.Product
-- CREATE PROCEDURE sp_GetProductInfo
--     @ProductName NVARCHAR(50)
-- AS
-- BEGIN
--     SELECT 
--         ProductID,
--         ProductNumber,
--         Name,
--         CASE 
--             WHEN StockLevel > 0 THEN 'Available'
--             ELSE 'Out of Stock'
--         END AS Availability
--     FROM Production.Product
--     WHERE Name = @ProductName;
-- END;

CREATE PROCEDURE Production.GetProductDetailsByName
    @ProductName NVARCHAR(100)
AS
BEGIN

    SELECT 
        ProductID,
        ProductNumber,
        CASE 
            WHEN SellEndDate IS NULL THEN 'Available'
            ELSE 'Not Available'
        END AS Availability
    FROM Production.Product
    WHERE Name = @ProductName;
END;
