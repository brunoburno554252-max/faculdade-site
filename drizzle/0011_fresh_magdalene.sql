CREATE TABLE `pageviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`path` varchar(500) NOT NULL,
	`referrer` varchar(500),
	`userAgent` text,
	`ipAddress` varchar(45),
	`sessionId` varchar(100),
	`viewedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pageviews_id` PRIMARY KEY(`id`)
);
