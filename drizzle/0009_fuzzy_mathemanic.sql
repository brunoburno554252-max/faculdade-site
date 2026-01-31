CREATE TABLE `pageviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`path` varchar(500) NOT NULL,
	`referrer` varchar(500),
	`userAgent` text,
	`ipAddress` varchar(45),
	`sessionId` varchar(64),
	`visitorId` varchar(64),
	`country` varchar(100),
	`city` varchar(100),
	`device` varchar(50),
	`browser` varchar(50),
	`os` varchar(50),
	`screenWidth` int,
	`screenHeight` int,
	`language` varchar(10),
	`viewedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pageviews_id` PRIMARY KEY(`id`)
);
