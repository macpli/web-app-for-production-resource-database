-- Create MP_Factory table
CREATE TABLE MP_Factory (
    IDFct INT PRIMARY KEY,
    Name VARCHAR(255),
    Description TEXT,
    IDOrg INT,
    NodeId INT,
    Location VARCHAR(255)
);

-- Create MP_Department table
CREATE TABLE MP_Department (
    IDDep INT PRIMARY KEY,
    IDFct INT,
    Name VARCHAR(255),
    Description TEXT,
    NodeId INT,
    Manager VARCHAR(255),
    FOREIGN KEY (IDFct) REFERENCES MP_Factory(IDFct)
);

-- Create MP_Cell table
CREATE TABLE MP_Cell (
    IDCel INT PRIMARY KEY,
    IDDep INT,
    CELType VARCHAR(255),
    Name VARCHAR(255),
    Description TEXT,
    NodeId INT,
    Supervisor VARCHAR(255),
    WarehouseType VARCHAR(255),
    FOREIGN KEY (IDDep) REFERENCES MP_Department(IDDep)
);

-- Create MP_Workstation table
CREATE TABLE MP_Workstation (
    IDWst INT PRIMARY KEY,
    IDCel INT,
    WSTType VARCHAR(255),
    Name VARCHAR(255),
    Description TEXT,
    NodeId INT,
    FOREIGN KEY (IDCel) REFERENCES MP_Cell(IDCel)
);

-- Create Devices table
CREATE TABLE Devices (
    ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Width DECIMAL(10, 2),
    Height DECIMAL(10, 2),
    Type VARCHAR(255),
    KeyId INT,
    ParentId INT,
    FOREIGN KEY (KeyId) REFERENCES MP_Workstation(IDWst)
);

-- Create TreeOfMfqPlants table
CREATE TABLE TreeOfMfqPlants (
    NodeID INT PRIMARY KEY,
    KeyID INT,
    ParentID INT,
    Name VARCHAR(255),
    Width DECIMAL(10, 2),
    Height DECIMAL(10, 2),
    xCoordinate DECIMAL(10, 2),
    yCoordinate DECIMAL(10, 2),
    FOREIGN KEY (KeyID) REFERENCES MP_Workstation(IDWst),
    FOREIGN KEY (ParentID) REFERENCES TreeOfMfqPlants(NodeID)
);
