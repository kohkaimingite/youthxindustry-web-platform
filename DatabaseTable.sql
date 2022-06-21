DROP TABLE IF EXISTS Partners_Have_Opp;
DROP TABLE IF EXISTS Application;
DROP TABLE IF EXISTS Admin;
DROP TABLE IF EXISTS Partners_Have_Users;
DROP TABLE IF EXISTS Users_Have_Opp;
DROP TABLE IF EXISTS Users_Have_Fav;
DROP TABLE IF EXISTS Opportunities;
DROP TABLE IF EXISTS Organisation;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Roles;


CREATE TABLE Roles
(
  RoleID INT NOT NULL,
    Description VARCHAR(50),
    PRIMARY KEY (RoleID)
);

CREATE TABLE Users
(
   UserID   INT AUTO_INCREMENT,
   RoleID INT NOT NULL,
   FOREIGN KEY (RoleID) REFERENCES Roles(RoleID),
   Name   VARCHAR(50) NOT NULL,
   Password VARCHAR(50) NOT NULL,
   Email VARCHAR(50) NOT NULL,
   Age   INT NULL,
   Gender CHAR NULL,
   DateCreated VARCHAR(20) NOT NULL,
   UserBio VARCHAR(255) NULL,
   LastLogged VARCHAR(20) NOT NULL,
   ContactNumber INT(10) NOT NULL,
   Resume BLOB NULL,
   
   PRIMARY KEY (UserID)
);

CREATE TABLE Opportunities
(
   OppID   INT AUTO_INCREMENT,
   Name   VARCHAR(150) NOT NULL,
   Description   VARCHAR(255) NOT NULL,
   Location   VARCHAR(255) NOT NULL,
   Address VARCHAR(255) NOT NULL,
   Type VARCHAR(50) NOT NULL,
   PRIMARY KEY (OppID)
);

CREATE TABLE Users_Have_Opp
(
   UserID   INT NOT NULL,
   OppID INT NOT NULL,
   FOREIGN KEY (UserID) REFERENCES Users(UserID),
   FOREIGN KEY (OppID) REFERENCES Opportunities(OppID),
   Review   VARCHAR(150) NULL,
   Rating   INT NULL
);

CREATE TABLE Users_Have_Fav
(
   UserID   INT NOT NULL,
   OppID INT NOT NULL,
   FOREIGN KEY (UserID) REFERENCES Users(UserID),
   FOREIGN KEY (OppID) REFERENCES Opportunities(OppID)
   
);

CREATE TABLE Application
(
  AppID INT AUTO_INCREMENT,
    OppID INT NOT NULL,
    UserID INT NOT NULL,
    Description VARCHAR(150) NOT NULL,
    Status VARCHAR(10) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (OppID) REFERENCES Opportunities(OppID),
    
    
    PRIMARY KEY (AppID)
)




INSERT INTO roles VALUES (1, 'Users');
INSERT INTO roles VALUES (2, 'Partners');
INSERT INTO roles VALUES (3, 'Admin');
INSERT INTO users (UserID, RoleID, Name, Password, Email, DateCreated, UserBio, LastLogged, ContactNumber)VALUES (1, 2, 'SupermegaCorp', 'pa$$word', 'superMC@xyz.com', '12-05-2021', 'Creating geniuses forever', '28-05-22', 88888888) ;
INSERT INTO users (Name, Password, Email, Age, Gender, DateCreated, UserBio, LastLogged, ContactNumber, RoleID) VALUES ('Tommy', 'peepee', 'tommy@gmail.com', '19', 'M', '21-05-2022', 'Always working', '31-05-2022', 85858585, 1);
INSERT INTO users (Name, Password, Email, Age, Gender, DateCreated, UserBio, LastLogged, ContactNumber, RoleID) VALUES ('Timmy', 'poopy', 'timmy@gmail.com', '20', 'M', '12-12-21', 'Striving to learn', '28-05-22', 12345678, 1) ;
INSERT INTO opportunities VALUES (1, 'Web Developemnt Intern', 'Develop a website with guidance and learn about web designing with HTML', 'Jurong East Street 21 601204', 'West', 'IT');
INSERT INTO opportunities (OppID,Name,Description,Location,Address,Type) VALUES (121212,'Junior Frontend Developer – Intern','Participate in the front-end team\'s basic technology construction, including the construction of cross-end solutions, and continuously improve R&D efficiency and code quality','Central','Media Link , 139305','IT');
INSERT INTO opportunities (OppID,Name,Description,Location,Address,Type) VALUES (123456,'Web Developer Intern','Design, develop, implement, and maintain new and existing web-based applications','Central','158 Kallang Way, #03-05 Performance Building , 349245','IT');
INSERT INTO opportunities (OppID,Name,Description,Location,Address,Type) VALUES (696969,'Front-end website','Design and code with frontend technologies such as CSS, HTML, Javascript, React and Angular frameworks to improve the availability, scalability, latency, and efficiency.','East','81 Ubi Ave 4 UB. One Building #06-08, 408830','IT');
INSERT INTO opportunities (OppID,Name,Description,Location,Address,Type) VALUES (145642,'Nurse','Admission, transfer and discharge of patients','Central','5 Lower Kent Ridge Rd, Singapore 119074','Healthcare');
INSERT INTO opportunities (OppID,Name,Description,Location,Address,Type) VALUES (177789,'Accountant','Process fund transfer for both inward and outward payment','West','304 Choa Chu Kang Ave 4, #01-663, Singapore 680304','Finance');
INSERT INTO opportunities (OppID,Name,Description,Location,Address,Type) VALUES (239284,'Childcare Teacher','Plan, supervise and implement the programme for the class in accordance with centre’s policies and framework.','Central','Shenton House, 3 Shenton Way 068805','Education');
INSERT INTO opportunities (OppID,Name,Description,Location,Address,Type) VALUES (358923,'Assistant Teacher','Responsible for operational finance and driving finance operational efficiencies.','Central','Bugis','Finance');
INSERT INTO opportunities (OppID,Name,Description,Location,Address,Type) VALUES (490234,'IT Support Administrator','Provide 1st level IT support to 50 users - software installation & update, backup & recovery','West','Venture Dr, #06-08 Regus - Singapore, Vision Exchange, 2, Singapore 608526','Healthcare');
INSERT INTO opportunities (OppID,Name,Description,Location,Address,Type) VALUES (510201,'Tutor','Able to teach English, Maths and/or Science.','Central','110 Lor 23 Geylang, #01-07 Victory Centre, Singapore 388410','Education');
INSERT INTO opportunities(OppID,Name,Description,Location,Address,Type) VALUES (609212,'Equity Trader','Possesses quick and decisive thinking and the ability to perform in a dynamic and stressful environment','Central','#07-02 / #07-03 China Square Central, 18 Cross St, Singapore 048423','Finance');
INSERT INTO opportunities(OppID,Name,Description,Location,Address,Type) VALUES (223892,'Community Nurse','Plan, co-ordinate, integrate and facilitate care for elderly in the community','East','55 Ubi Ave 1, #08-01, Singapore 408935','Healthcare');



INSERT INTO opportunities(OppID,Name,Description,Location,Address,Type) VALUES (395342,'Finance Manager','Responsible for operational finance and driving finance operational efficiencies.','Central','Bugis','Finance');
INSERT INTO opportunities(OppID,Name,Description,Location,Address,Type) VALUES (438223,'Research Officer (Pharmacy) Microbiology','Assist in leading research projects and initiatives that focus on bacteriophage therapy.','Central','Bukit Merah','Healthcare');
INSERT INTO opportunities(OppID,Name,Description,Location,Address,Type) VALUES (568756,'Special Education Teacher','Develop and implement IEPs for each child and track progress','Central','Bukit Timah','Education');
INSERT INTO opportunities(OppID,Name,Description,Location,Address,Type) VALUES (690649,'Financial & Costing Analyst','Provides useful insights to management for operational and financial improvements','East','Changi South Lane','Finance');
INSERT INTO users_have_fav VALUES (2,145642) ;
INSERT INTO users_have_fav VALUES (2,177789) ;
INSERT INTO users_have_fav VALUES (2,696969) ;
INSERT INTO users_have_fav VALUES (2,121212) ;
INSERT INTO users_have_opp VALUES (2,177789,NULL,NULL) ;
INSERT INTO users_have_opp VALUES (2,696969,NULL,NULL) ;
INSERT INTO users_have_opp VALUES (2,121212,NULL,NULL) ;
INSERT INTO application (OppID, UserID, Description, Status) VALUES (121212, 1, 'testing for resume?', 'Pending');