INSERT IGNORE INTO roles (id, `name`) VALUES (1, 'admin');
INSERT IGNORE INTO roles (id, `name`) VALUES (2, 'user');

INSERT IGNORE INTO users (id, username, email, `password`, account_confirmed, role_id) VALUES
(1, 'admin', 'candicedsouza@24hinbox.com', 'db735458867474ed3163fd668a7324d4c03853bec77d1ab3dc2f070ad92d80dc', true, 1),
(2, 'bfurst', 'furstborna7@gmail.com', 'f09bc657f0a6d8aabd68180d31107a5d496542143939ea3b574b69896cffa812', true, 2),
(3, 'pperic', 'chykn1@kiranablogger.xyz', 'a31b3eeaeda918da1d999186b674d30e84cb4b7dc60efe8aeb3282ca95a4bad5', true, 2),
(4, 'iivic', 'tanatrnrnlb@dealyaari.com', '3263e6b623035999e703e571f311262941212630f4111b65ca37bbeca2dc953d', true, 2),
(5, 'mmaric', 'mmaric@example.com', '0f6b163a2621032800328bceed23c0a85f7e1f2934da6198e92c7bf1b3bd1545', true, 2),
(6, 'iivanic', 'iivanic@example.com', '852bf3bcbe8ba65f053920b54c44691572fc509024b9ecd5a115d69b81efebfb', true, 2),
(7, 'avukovic', 'avukovic@example.com', '1a898e91c303c1a32e6e44af1d240fef51c91a2e0348b72e0c63e4ebfb3342ad', true, 2),
(8, 'sstipic', 'sstipic@example.com', 'b6fcdf24e78b67e71524d2353cc9da48df68127a1cde768e7640ecbf3bec3251', true, 2),
(9, 'mmatic', 'mmatic@example.com', '43a0736f3aa441f29d2579a8373a1f6def6f221f809eb138773b6ba796c6891a', true, 2),
(10, 'lboric', 'lboric@example.com', '8b31fca133a6c1eecb9efbab7bbe635b073458bde8af43785469248805966c6e', true, 2);

INSERT IGNORE INTO countries (id, `name`, code) VALUES
(1, 'Croatia', 'HR'),
(2, 'Scotland', 'GB'),
(3, 'England', 'GB'),
(4, 'United States of America', 'US'),
(5, 'Denmark', 'DK'),
(6, 'Swedan', 'SE');

INSERT IGNORE INTO breweries (id, `name`, `description`, founded_in, `url`, `image`, country_id) VALUES
(1, 'Zmajska Pivovara', 'Zmajska Pivovara is a pioneer of the Croatian craft beer scene, known for its diverse range and innovative beer styles.', 2013, 'https://zmajskapivovara.hr/', 'brewery-default.jpg', 1),
(2, 'Medvedgrad Pivovara', 'Medvedgrad Pivovara, founded in 1994, offers traditional and innovative craft beers, which are popular among beer lovers.', 1994, 'https://pivovara-medvedgrad.hr/', 'brewery-default.jpg', 1),
(3, 'Garden Brewery', 'Garden Brewery is known for its modern beer styles, attractive design, and vibrant beer scene that brings together beer enthusiasts.', 2016, 'https://thegarden.hr/', 'brewery-default.jpg', 1),
(4, 'Nova Runda', 'Nova Runda produces authentic craft beers with a special emphasis on hops, providing beer drinkers with unique experiences.', 2014, 'https://novarunda.com/', 'brewery-default.jpg', 1),
(5, 'Varionica', 'Varionica is a brewery from Zabok that blends traditional and modern beer styles, creating high-quality products.', 2014, 'https://varionica.com/', 'brewery-default.jpg', 1),
(6, 'Lepi Dečki Brewery', 'Lepi Dečki Brewery from Čakovec offers a variety of craft beers for every taste, standing out for quality and innovation.', 2015, 'https://lepidecki.hr/', 'brewery-default.jpg', 1),
(7, 'Pulfer', 'Pulfer Brewery from Zagreb is known for its creative and innovative beer styles that win over beer lovers.', 2016, 'https://pulfer.hr/', 'brewery-default.jpg', 1),
(8, 'Mlinarica', 'Mlinarica from Osijek brings both traditional and contemporary beer flavors, and is popular among local beer drinkers.', 2016, 'https://mlinarica.com/', 'brewery-default.jpg', 1),
(9, 'Brlog Pivovara', 'Brlog Pivovara from Zadar is known for its craft beers and social engagement, and is loved by beer enthusiasts.', 2016, 'https://brlog.beer/', 'brewery-default.jpg', 1),
(10, 'Crafter''s Brewery', 'Crafter''s Brewery from Split offers a rich selection of high-quality craft beers, standing out for creativity and innovation.', 2017, 'https://craftersbrewery.com/', 'brewery-default.jpg', 1),
(11, 'BrewDog', 'BrewDog is a Scottish craft brewery known for its innovative beers and controversial marketing campaigns.', 2007, 'https://www.brewdog.com/', 'brewery-default.jpg', 2),
(12, 'Stone Brewing', 'Stone Brewing from California is one of the most famous American craft breweries, known for its hoppy beers.', 1996, 'https://www.stonebrewing.com/', 'brewery-default.jpg', 4),
(13, 'Sierra Nevada', 'Sierra Nevada is a pioneer of the American craft beer scene, known for its classic and innovative beers.', 1980, 'https://sierranevada.com/', 'brewery-default.jpg', 4),
(14, 'Dogfish Head', 'Dogfish Head from Delaware is known for its experimental beers and creative approach to beer production.', 1995, 'https://www.dogfish.com/', 'brewery-default.jpg', 4),
(15, 'The Alchemist', 'The Alchemist from Vermont is known for its hoppy beers, including the cult beer Heady Topper.', 2003, 'https://alchemistbeer.com/', 'brewery-default.jpg', 4),
(16, 'Mikkeller', 'Mikkeller from Denmark is known for its innovative and experimental beers produced worldwide.', 2006, 'https://mikkeller.dk/', 'brewery-default.jpg', 5),
(17, 'Omnipollo', 'Omnipollo is a Swedish brewery that creates unique and creative beers in collaboration with breweries worldwide.', 2011, 'https://omnipollo.com/', 'brewery-default.jpg', 6),
(18, 'Beavertown', 'Beavertown from London is known for its hoppy beers and unique can designs.', 2011, 'https://www.beavertownbrewery.co.uk/', 'brewery-default.jpg', 3),
(19, 'To Øl', 'To Øl is a Danish brewery focusing on innovative beers and collaborations with other breweries.', 2010, 'https://toolbeer.dk/', 'brewery-default.jpg', 5),
(20, 'Founders Brewing Co.', 'Founders Brewing Co. from Michigan is known for its rich and complex beers that have gained cult status.', 1997, 'https://foundersbrewing.com/', 'brewery-default.jpg', 4);

INSERT IGNORE INTO beer_categories (id, `name`) VALUES
(1, 'Lager'),
(2, 'Pilsner'),
(3, 'Ale'),
(4, 'Stout'),
(5, 'Porter'),
(6, 'IPA'),
(7, 'Wheat Beer'),
(8, 'Saison'),
(9, 'Sour Ale'),
(10, 'Barleywine');

INSERT IGNORE INTO beer_shades (id, shade) VALUES
(1, 'Amber'),
(2, 'Dark Brown'),
(3, 'Pale Yellow'),
(4, 'Black'),
(5, 'Golden'),
(6, 'Hazy Orange'),
(7, 'Pink'),
(8, 'Dark Amber'),
(9, 'Red'),
(10, 'Brown');

INSERT IGNORE INTO beers (id, `name`, `image`, alcohol_percentage, `description`, year_introduced, is_available, beer_shade_id, beer_category_id, brewery_id) VALUES
(1, 'Zmajska Pale Ale', 'beer-default.jpg', 5.5, 'A balanced pale ale with a smooth bitterness and floral aroma.', 2014, TRUE, 1, 3, 1),
(2, 'Zmajska Porter', 'beer-default.jpg', 6.5, 'Rich and complex porter with roasted malt and chocolate notes.', 2015, TRUE, 2, 5, 1), 
(3, 'Zmajska IPA', 'beer-default.jpg', 6.2, 'Hoppy and aromatic India Pale Ale with citrus and pine notes.', 2016, TRUE, 1, 6, 1),
(4, 'Zmajska Hoppy Wheat', 'beer-default.jpg', 4.7, 'Refreshing wheat beer with a hint of citrus and mild bitterness.', 2017, TRUE, 3, 7, 1),
(5, 'Zmajska RIS', 'beer-default.jpg', 10.2, 'Powerful stout with deep roasted flavors and high alcohol content.', 2018, TRUE, 4, 4, 1),
(6, 'Zmajska Porter with Coffee', 'beer-default.jpg', 6.7, 'Porter brewed with coffee beans for added richness.', 2019, FALSE, 2, 5, 1),
(7, 'Zmajska Session IPA', 'beer-default.jpg', 4.5, 'Light and hoppy session IPA with tropical fruit notes.', 2020, TRUE, 5, 6, 1),
(8, 'Zmajska Saison', 'beer-default.jpg', 6.0, 'Farmhouse ale with a dry finish and fruity esters.', 2016, FALSE, 5, 8, 1),
(9, 'Zmajska New England IPA', 'beer-default.jpg', 6.5, 'Juicy IPA with a hazy appearance and tropical hop character.', 2020, TRUE, 6, 6, 1),
(10, 'Zmajska Baltic Porter', 'beer-default.jpg', 8.0, 'Strong and smooth porter with dark fruit and licorice flavors.', 2021, TRUE, 4, 5, 1),
(11, 'Zmajska Imperial IPA', 'beer-default.jpg', 8.5, 'Intensely hoppy IPA with high bitterness and resinous notes.', 2018, FALSE, 1, 6, 1),
(12, 'Zmajska Fruit Sour', 'beer-default.jpg', 4.2, 'Tart and refreshing sour ale with added fruit flavors.', 2021, TRUE, 7, 9, 1),
(13, 'Zmajska Winter Ale', 'beer-default.jpg', 7.0, 'Spiced winter ale with warming flavors of cinnamon and clove.', 2019, TRUE, 8, 3, 1),
(14, 'Zmajska Black IPA', 'beer-default.jpg', 7.2, 'Bold IPA with roasted malt and a balanced bitterness.', 2017, FALSE, 2, 6, 1),
(15, 'Zmajska Double IPA', 'beer-default.jpg', 9.0, 'High-alcohol IPA with a strong hop presence and malty backbone.', 2018, TRUE, 1, 6, 1),
(16, 'Zmajska Blonde Ale', 'beer-default.jpg', 5.0, 'Easy-drinking blonde ale with a light malt profile and subtle hops.', 2022, TRUE, 5, 3, 1),
(17, 'Zmajska Nitro Stout', 'beer-default.jpg', 5.8, 'Creamy stout with smooth mouthfeel and roasted coffee flavors.', 2021, TRUE, 4, 4, 1),
(18, 'Zmajska Brett IPA', 'beer-default.jpg', 6.8, 'Wild IPA brewed with Brettanomyces for funky and fruity notes.', 2020, FALSE, 5, 6, 1),
(19, 'Zmajska Milk Stout', 'beer-default.jpg', 5.5, 'Sweet and creamy stout with lactose for added body.', 2022, TRUE, 2, 4, 1),
(20, 'Zmajska Citrus Pale Ale', 'beer-default.jpg', 5.4, 'Pale ale with added citrus peel for a refreshing twist.', 2023, TRUE, 9, 3, 1),
(21, 'Zmajska Imperial Stout', 'beer-default.jpg', 9.5, 'Bold and rich imperial stout with deep roasted flavors.', 2018, TRUE, 4, 4, 1),
(22, 'Zmajska Amber Ale', 'beer-default.jpg', 5.8, 'Balanced amber ale with a malt-forward character and a hint of caramel.', 2017, TRUE, 1, 3, 1),
(23, 'Zmajska West Coast IPA', 'beer-default.jpg', 7.0, 'Classic West Coast IPA with a strong hop presence and a crisp finish.', 2019, TRUE, 5, 6, 1),
(24, 'Zmajska Triple IPA', 'beer-default.jpg', 10.0, 'Extremely hoppy and high-alcohol triple IPA with intense bitterness.', 2021, TRUE, 1, 6, 1),
(25, 'Zmajska Brown Ale', 'beer-default.jpg', 5.4, 'Smooth and malty brown ale with nutty and caramel flavors.', 2018, TRUE, 10, 3, 1),
(26, 'Zmajska Rauchbier', 'beer-default.jpg', 6.0, 'Smoked beer with a rich malt profile and smoky aroma.', 2020, TRUE, 8, 3, 1),
(27, 'Zmajska Belgian Dubbel', 'beer-default.jpg', 7.5, 'Complex Belgian-style dubbel with rich malt and dark fruit notes.', 2019, FALSE, 2, 3, 1),
(28, 'Zmajska Hazy IPA', 'beer-default.jpg', 6.8, 'Juicy and hazy IPA with tropical fruit aromas and a smooth mouthfeel.', 2022, TRUE, 3, 6, 1),
(29, 'Zmajska Red Ale', 'beer-default.jpg', 6.0, 'Robust red ale with a balance of malt sweetness and hop bitterness.', 2016, FALSE, 9, 3, 1),
(30, 'Zmajska Pale Lager', 'beer-default.jpg', 4.8, 'Crisp and refreshing pale lager with a clean finish.', 2023, TRUE, 5, 1, 1),
(31, 'Zlatni Medo', 'beer-default.jpg', 5.0, 'A golden lager with a crisp and refreshing taste, perfect for any occasion.', 2007, TRUE, 5, 1, 2),
(32, 'Fakin', 'beer-default.jpg', 6.2, 'A hoppy IPA with strong citrus and tropical fruit notes.', 2010, TRUE, 1, 6, 2),
(33, 'Vragec', 'beer-default.jpg', 5.5, 'A pale ale with balanced malt and hop bitterness, featuring a smooth finish.', 2011, TRUE, 3, 3, 2),
(34, 'Medvedgrad Tamno', 'beer-default.jpg', 5.4, 'A rich dark lager with roasted malt flavors and a smooth, clean finish.', 2012, TRUE, 2, 1, 2),
(35, 'Medvedgrad Pilsner', 'beer-default.jpg', 5.2, 'A traditional pilsner with a dry, crisp finish and light hop bitterness.', 2014, TRUE, 3, 2, 2),
(36, 'Fakin IPA', 'beer-default.jpg', 6.5, 'A West Coast-style IPA with a bold hop profile and piney, resinous bitterness.', 2015, TRUE, 1, 6, 2),
(37, 'Medvedgrad Porter', 'beer-default.jpg', 6.2, 'A rich porter with flavors of roasted malt, chocolate, and coffee.', 2016, TRUE, 2, 5, 2),
(38, 'Medvedgrad Stout', 'beer-default.jpg', 6.8, 'A creamy stout with deep roasted malt flavors and a smooth mouthfeel.', 2017, TRUE, 4, 4, 2),
(39, 'Vragec Red Ale', 'beer-default.jpg', 5.8, 'A well-balanced red ale with malt sweetness and a touch of hop bitterness.', 2018, TRUE, 9, 3, 2),
(40, 'Medvedgrad Sour Ale', 'beer-default.jpg', 4.3, 'A tart, refreshing sour ale with fruit-forward acidity and a clean finish.', 2020, TRUE, 6, 9, 2);

INSERT IGNORE INTO reviews (id, `description`, rating, user_id, beer_id) VALUES
(1, "A refreshing and light beer, perfect for casual drinking.", 4.2, 3, 1),
(2, "Not bad, but the aftertaste is a bit too bitter for me.", 3.5, 5, 1),
(3, "Really enjoyed this one. Light and crisp with a smooth finish.", 4.8, 7, 1),
(4, "The taste is okay, but it could use a little more depth.", 3.1, 9, 2),
(5, "Excellent balance of malt and hops. A solid choice for a pale ale.", 4.4, 6, 2),
(6, "A bit too strong for my taste, but fans of bold flavors will love it.", 3.8, 8, 2),
(7, "One of the best lagers I’ve had! Smooth, with just the right amount of bitterness.", 4.7, 2, 3),
(8, "Very average. It’s okay, but doesn’t stand out from the crowd.", 3.3, 4, 3),
(9, "Nice beer, but I wish it had a bit more carbonation.", 3.9, 6, 3),
(10, "A fantastic wheat beer, light and refreshing with a pleasant citrus zing.", 4.5, 2, 4),
(11, "Great combination of wheat and citrus, very easy to drink on a hot day.", 4.7, 3, 4),
(12, "Mild bitterness, refreshing with just the right amount of sweetness. Really enjoyed it!", 4.3, 6, 4),
(13, "Deep, roasted flavors that hit all the right notes. The high ABV is just right for the style.", 4.9, 2, 5),
(14, "Very strong stout with robust coffee and chocolate notes. The alcohol is well-hidden.", 4.8, 4, 5),
(15, "Intense flavor profile, quite boozy but smooth. A perfect stout for cold evenings.", 5.0, 7, 5),
(16, "Love the richness of the coffee flavor here, it adds so much depth to the porter.", 4.6, 3, 6),
(17, "A very smooth porter, the coffee flavor is bold but not overwhelming.", 4.4, 5, 6),
(18, "The coffee and roasted malt pairing is perfect. It has a smooth finish with a slight bitterness.", 4.8, 6, 6),
(19, "Perfectly light for a session IPA, tropical fruit flavors are a nice touch.", 4.3, 2, 7),
(20, "Great summer beer! Hoppy and light, the tropical notes really stand out.", 4.5, 4, 7),
(21, "A very refreshing IPA with a clean finish. Ideal for a long drinking session.", 4.2, 6, 7),
(22, "A lovely saison with fruity esters and a dry finish. Perfect for warm weather.", 4.6, 3, 8),
(23, "Nice complexity, a good balance of fruity flavors and dryness. Very enjoyable.", 4.7, 5, 8),
(24, "Interesting beer with a very unique finish. Not my go-to style, but I appreciate the flavor.", 3.9, 7, 8),
(25, "Super juicy IPA with a hazy look. Tropical fruits dominate and it's very smooth.", 4.8, 4, 9),
(26, "This is a juicy, hazy IPA with great balance and flavor. Very drinkable!", 4.9, 6, 9),
(27, "Smooth and fruity, just the way I like my NEIPAs. Would definitely recommend.", 4.7, 2, 9),
(28, "Strong, rich porter with deep flavors of dark fruit. It’s smooth and satisfying.", 4.6, 3, 10),
(29, "Full-bodied with strong roasted malt flavors and a nice finish.", 4.5, 6, 10),
(30, "A bit sweet, but the licorice and fruit flavors are a nice touch. Very enjoyable.", 4.4, 2, 10),
(31, "A bold IPA with an intense hop bitterness. It's a bit much for me, but fans of strong IPAs will love it.", 4.2, 3, 11),
(32, "Strong, resinous hop profile and high bitterness, but it’s very well balanced for its ABV.", 4.6, 2, 11),
(33, "A robust IPA with an impressive alcohol punch. Intense but satisfying.", 4.8, 5, 11),
(34, "A refreshing sour ale with a tart punch and nice fruit flavors. Perfect for a hot day.", 4.5, 4, 12),
(35, "Light and tangy, a fun twist on a sour. The fruit adds an interesting dimension to the taste.", 4.3, 6, 12),
(36, "Not my usual style, but I enjoyed the fruity tang. A bit too sour for me personally, but well done.", 3.8, 2, 12),
(37, "A perfect winter ale, warm and spiced with a lovely cinnamon flavor. Cozy and rich.", 4.7, 5, 13),
(38, "Nice spiced beer with hints of clove and cinnamon. Ideal for the colder months.", 4.5, 4, 13),
(39, "Rich flavors, but a bit too spiced for my taste. Still a decent winter ale.", 4.0, 6, 13),
(40, "Bold and bitter with roasted malt flavors. A very enjoyable black IPA.", 4.6, 2, 14),
(41, "A great combination of roast and hops. It has a very complex and balanced flavor.", 4.7, 6, 14),
(42, "A bit too roasty for my taste, but still a solid black IPA. Nice bitterness.", 3.9, 5, 14),
(43, "Big, bold, and hoppy! It’s got a great malty backbone that balances the bitterness.", 4.8, 3, 15),
(44, "High alcohol content with a strong hop presence. The malts help smooth it out, but still very intense.", 4.6, 5, 15),
(45, "An incredible DIPA with a perfect balance of malt sweetness and hop bitterness. Very well-crafted.", 4.9, 2, 15),
(46, "A smooth blonde ale with a crisp finish. Perfect for a casual drink.", 4.3, 2, 16),
(47, "Light, refreshing and easy to drink. A solid blonde ale for warm weather.", 4.5, 4, 16),
(48, "Nice balance of roasted coffee and smoothness. A good stout for coffee lovers.", 4.7, 3, 17),
(49, "The nitro effect really makes this one creamy. Great coffee flavors, smooth mouthfeel.", 4.6, 5, 17),
(50, "Funky and unique IPA with Brettanomyces. Definitely a wild twist on the style.", 4.2, 2, 18),
(51, "A very interesting beer with a combination of funk and fruitiness. Definitely not for everyone.", 4.0, 6, 18),
(52, "A fantastic milk stout with a creamy texture. The sweetness from the lactose is perfect.", 4.5, 3, 19),
(53, "Sweet, smooth, and creamy with just the right amount of stout richness. Perfectly balanced.", 4.7, 4, 19),
(54, "Citrusy and light with a nice bitter finish. Great for a warm day!", 4.6, 2, 20),
(55, "A strong and bold stout, rich with dark fruits and roasted flavors. Perfect for winter nights.", 4.8, 6, 21),
(56, "Full-bodied and smooth, with a deep malt profile and a warming sensation. A top-notch stout.", 4.7, 3, 21),
(57, "A balanced amber ale with a pleasant maltiness. Very drinkable and satisfying.", 4.4, 2, 22),
(58, "Nice caramel and malt-forward flavors, but could use a bit more hop character.", 4.2, 4, 22),
(59, "The bitterness and hop flavor are strong in this IPA, but the crisp finish makes it enjoyable.", 4.5, 6, 23),
(60, "A classic West Coast IPA with a nice punch of hops and a dry finish.", 4.3, 5, 23),
(61, "An intense triple IPA, very hoppy and high in alcohol. It’s a challenge, but a good one.", 4.8, 2, 24),
(62, "Very bold and bitter, definitely for fans of big, strong beers. I love it!", 4.7, 6, 24),
(63, "Smooth, nutty, and caramel-forward. This brown ale is delicious and very drinkable.", 4.6, 4, 25),
(64, "A rich brown ale with a great balance of sweetness and bitterness. A lovely beer for any occasion.", 4.5, 3, 25),
(65, "Nice smoky flavors with a rich malt backbone. A great choice for those who enjoy Rauchbier.", 4.4, 2, 26),
(66, "The smoky aroma is great, and the malt profile is rich and complex. A standout in the style.", 4.6, 5, 26),
(67, "A complex Belgian-style dubbel with rich malt and dark fruit flavors. A bit heavy but enjoyable.", 4.7, 6, 27),
(68, "Deep and flavorful with a warming finish. A fantastic example of the style.", 4.8, 3, 27),
(69, "Juicy and tropical, with a smooth mouthfeel. A great hazy IPA for hop lovers.", 4.5, 5, 28),
(70, "Very smooth, with a nice blend of fruit and hops. A go-to for hazy IPA fans.", 4.6, 2, 28),
(71, "A solid red ale with a good malt backbone and balanced bitterness. Very drinkable.", 4.4, 3, 29),
(72, "Nice and smooth with caramel and roasted flavors. Perfect for those who like malty ales.", 4.5, 4, 29),
(73, "Crisp, refreshing, and perfect for a hot day. A great pale lager with clean flavors.", 4.6, 2, 30),
(74, "A well-balanced pale lager with a light finish. Very refreshing and easy to drink.", 4.4, 3, 30),
(75, "Crisp and refreshing, a perfect beer for a hot day.", 5, 2, 31),
(76, "A solid lager with a smooth taste, but could be a bit more flavorful.", 3, 3, 31),
(77, "One of my favorite beers, light yet satisfying!", 4, 4, 1),
(78, "Nice hop bitterness with citrus notes. Definitely a refreshing IPA.", 4, 5, 32),
(79, "Too hoppy for my taste, but well-crafted for IPA lovers.", 3, 6, 32),
(80, "Really enjoyed this one, the tropical fruit aromas are amazing!", 5, 7, 32),
(81, "Smooth and well-balanced. A perfect pale ale!", 5, 8, 3),
(82, "Nice but not outstanding. A good beer but lacks a bit of punch.", 3, 9, 33),
(83, "Great beer, well balanced with a light finish. Would definitely buy again.", 4, 2, 33),
(84, "A rich and smooth dark lager with nice roasted malt flavors. The clean finish is perfect.", 4.5, 2, 34),
(85, "Nice roasted notes and very easy to drink. Perfect for a night in.", 4.3, 4, 34),
(86, "Crisp and refreshing, just the way a pilsner should be. The bitterness is light and balanced.", 4.2, 3, 35),
(87, "Classic pilsner with a clean finish. Great for casual drinking.", 4.1, 5, 35),
(88, "This IPA has a bold hop profile that stands out. The piney bitterness is spot on.", 4.6, 2, 36),
(89, "A solid West Coast IPA with resinous bitterness. The hops really shine in this one!", 4.7, 6, 36),
(90, "A rich and smooth porter with notes of chocolate and coffee. Very enjoyable!", 4.5, 2, 37),
(91, "Great porter with deep roasted malt flavors. The coffee taste is subtle but adds richness.", 4.6, 4, 37),
(92, "Smooth, creamy stout with a perfect balance of roasted malt and a silky finish.", 4.7, 3, 38),
(93, "The mouthfeel is fantastic, creamy and smooth. The roasted flavors are deep and satisfying.", 4.8, 5, 38),
(94, "A well-balanced red ale with a nice malt sweetness. The hop bitterness is just enough.", 4.3, 9, 39),
(95, "A very enjoyable red ale with a good malt backbone. Smooth and easy drinking.", 4.4, 2, 39),
(96, "Tart and refreshing with a great fruit-forward flavor. Perfect for a warm day.", 4.1, 6, 40),
(97, "A solid sour ale, but could use a bit more depth in the fruit flavors. Still refreshing!", 4.0, 3, 40);

INSERT IGNORE INTO votes (user_id, review_id, type) VALUES
(3, 1, "Like"),
(4, 1, "Like"),
(5, 1, "Like"),
(6, 1, "Like"),
(7, 1, "Dislike"),
(2, 2, "Like"),
(3, 2, "Dislike"),
(4, 2, "Dislike"),
(5, 2, "Like"),
(8, 3, "Like"),
(9, 3, "Like"),
(7, 4, "Like"),
(6, 4, "Dislike"),
(2, 5, "Like"),
(3, 5, "Like"),
(5, 6, "Dislike"),
(8, 6, "Like"),
(6, 7, "Like"),
(2, 7, "Like"),
(9, 7, "Dislike"),
(7, 8, "Dislike"),
(5, 8, "Like"),
(4, 9, "Like"),
(3, 9, "Like"),
(6, 9, "Dislike");

INSERT IGNORE INTO report_categories (id, `name`) VALUES 
(1, 'Inappropriate Content'),
(2, 'Spam'),
(3, 'Fake Account'),
(4, 'Sharing Personal Information'),
(5, 'Other');

INSERT IGNORE INTO restriction_categories (id, `name`, duration) VALUES
(1, '1 day', 1),
(2, '7 days', 7),
(3, '30 days', 30),
(4, 'Permanent', NULL);


INSERT IGNORE INTO news (id, `subject`, body, `image`, user_id) VALUES
(1, 'New Brewery Partnership', 'We are excited to announce our new partnership with local breweries to bring you more exclusive beers. This collaboration aims to enhance the variety and quality of beers available on our platform. Stay tuned for more updates on special releases and events.', 'news1.jpg', 1),
(2, 'App Update Released', 'Our latest app update includes new features and improvements for a better user experience. Users can now enjoy enhanced navigation and quicker access to their favorite beers. We appreciate your feedback and continue to strive for excellence.', 'news2.jpg', 1),
(3, 'Community Events', 'Join our upcoming community events to meet fellow beer enthusiasts and discover new favorites. These events will feature tastings, workshops, and meet-and-greet sessions with brewmasters. Do not miss out on the opportunity to expand your beer knowledge and network.', 'news3.jpg', 1),
(4, 'Exclusive Beer Tasting', 'Do not miss our exclusive beer tasting event featuring rare and limited-edition brews. This is a unique opportunity to sample some of the most sought-after beers in the industry. Reserve your spot now as space is limited.', 'news4.jpg', 1),
(5, 'Beer Brewing Workshops', 'Sign up for our hands-on beer brewing workshops and learn the art of brewing your own beer. Our expert brewers will guide you through each step of the process, from selecting ingredients to bottling your brew. Perfect for beginners and seasoned brewers alike.', 'news5.jpg', 1);


DROP VIEW IF EXISTS reviews_filtered;

CREATE VIEW reviews_filtered AS
SELECT 
    r.id AS review_id,
    r.description,
    r.rating,
    COALESCE(likes_count.likes, 0) AS likes,
    COALESCE(dislikes_count.dislikes, 0) AS dislikes,
    u.id AS reviewer_id,
    u.username AS reviewer_username,
    u.profile_image AS reviewer_profile_image,
    u.account_deleted AS reviewer_account_deleted,
    COALESCE(COUNT(reps.review_id), 0) AS reports_number,
    r.beer_id,
    r.created_at
FROM 
    reviews r
LEFT JOIN
    reports reps ON r.id = reps.review_id
JOIN 
    users u ON r.user_id = u.id
LEFT JOIN 
    (SELECT review_id, CAST(COUNT(*) AS SIGNED) AS likes 
     FROM votes 
     WHERE type = 'Like' 
     GROUP BY review_id) likes_count 
ON r.id = likes_count.review_id
LEFT JOIN 
    (SELECT review_id, CAST(COUNT(*) AS SIGNED) AS dislikes 
     FROM votes 
     WHERE type = 'Dislike' 
     GROUP BY review_id) dislikes_count 
ON r.id = dislikes_count.review_id
GROUP BY 
    r.id, 
    r.description, 
    r.rating, 
    u.id, 
    u.username, 
    u.account_deleted, 
    r.beer_id, 
    r.created_at, 
    likes_count.likes, 
    dislikes_count.dislikes;