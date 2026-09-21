CREATE TABLE `contactRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`company` varchar(200) NOT NULL,
	`businessType` varchar(100) NOT NULL,
	`message` text NOT NULL,
	`deliveryStatus` varchar(40) NOT NULL DEFAULT 'received',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contactRequests_id` PRIMARY KEY(`id`)
);
