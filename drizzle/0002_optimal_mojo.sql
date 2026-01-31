ALTER TABLE `hero_banners` ADD `ctaText` varchar(100);--> statement-breakpoint
ALTER TABLE `hero_banners` ADD `ctaLink` varchar(500);--> statement-breakpoint
ALTER TABLE `hero_banners` ADD `displayDuration` int DEFAULT 10;--> statement-breakpoint
ALTER TABLE `hero_banners` ADD `textPosition` enum('left','center','right') DEFAULT 'left';--> statement-breakpoint
ALTER TABLE `hero_banners` ADD `overlayOpacity` int DEFAULT 50;