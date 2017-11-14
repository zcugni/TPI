-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Lun 19 Juin 2017 à 13:22
-- Version du serveur :  10.1.16-MariaDB
-- Version de PHP :  5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `chronoview`
--

--
-- Contenu de la table `category`
--

INSERT INTO `category` (`idCategory`, `name`) VALUES
(1, 'Europe'),
(2, 'Asie'),
(3, 'Amérique du nord'),
(4, 'Amérique du sud'),
(5, 'Afrique'),
(6, 'Australie'),
(7, 'Antarctique'),
(8, 'Littérature');

--
-- Contenu de la table `event`
--

INSERT INTO `event` (`idEvent`, `title`, `description`, `imgFileName`, `startingDay`, `startingMonth`, `startingYear`, `endingDay`, `endingMonth`, `endingYear`) VALUES
(2, '1ère guerre mondiale', 'La Première Guerre mondialen 1 est un conflit militaire impliquant dans un premier temps les puissances européennes et s''étendant ensuite à plusieurs continents de 1914 à 19181 (bien qu''ayant diplomatiquement perduré jusqu''en 1923 pour les pays concernés par le traité de Lausanne, le dernier à avoir été signé, le 24 juillet 1923).', NULL, '28', 'Juillet', 1914, '11', 'Novembre', 1918),
(3, 'Rum Rebellion', 'The Rum Rebellion of 1808 was the only successful armed takeover of government in Australian history. During the 19th century, it was widely referred to as the Great Rebellion.', NULL, '26', 'Janvier', 1808, '1', 'Janvier', 1810),
(4, 'Boston tea party', 'La Boston Tea Party fut une révolte politique à Boston, la capitale de la province de la baie du Massachusetts, contre le Parlement britannique en 1773.', NULL, '16', 'Décembre', 1773, '16', 'Décembre', 1773),
(5, 'United States Declaration of Independence (Ratification)', 'The Declaration of Independence is the statement adopted by the Second Continental Congress meeting at the Pennsylvania State House (Independence Hall) in Philadelphia on July 4, 1776, which announced that the thirteen American colonies,[2] then at war with the Kingdom of Great Britain, regarded themselves as thirteen newly independent sovereign states, and no longer under British rule. Instead they formed a new nation—the United States of America. John Adams was a leader in pushing for independence, which was passed on July 2 with no opposing vote cast. A committee of five had already drafted the formal declaration, to be ready when Congress voted on independence. The term "Declaration of Independence" is not used in the document itself.', NULL, '4', 'Juillet', 1776, '4', 'Juillet', 1776),
(6, 'Parution "Les Fleurs du Mal"', 'Les Fleurs du mal est le titre d''un recueil de poèmes en vers de Charles Baudelaire, englobant la quasi-totalité de sa production poétique, de 1840 jusqu''à sa mort survenue fin août 1867.\n\nPublié le 25 juin 1857, le livre fait scandale et suscite un procès retentissant qui entraîne la censure de 6 pièces. Il est réédité, dans des versions différentes, en 1861, 1866 puis 1868. La réhabilitation n''intervient qu''en 1949.\n\nC''est l’une des œuvres majeures de la poésie moderne. Ses 163 pièces rompent avec le style convenu, en usage jusqu''alors. Elles rajeunissent la structure du vers par l''usage régulier d''enjambements, de rejets et de contre-rejets. Elles rénovent la forme rigide du sonnet. Elles utilisent d''inédites associations d''images, tel l''« Ange cruel qui fouette des soleils » (Le Voyage). Elles mêlent langage savant et parler quotidien.\n\nLes Fleurs du mal diffèrent d''un recueil classique, où les poèmes ne sont souvent réunis que par l''effet du hasard. Elles sont assemblées selon un dessein précis pour chanter, avec une sincérité absolue :\n\nla souffrance d''ici-bas (conçue comme une conséquence de la finitude humaine et une nécessaire expiation, selon une conception toute chrétienne) ;\nle dégoût du mal (et souvent de soi-même) ;\nl''obsession de la mort ;\nl''aspiration à un monde idéal, accessible par de mystérieuses correspondances.\nNourries de sensations physiques que la mémoire restitue avec acuité, elles sont empreintes d’une nouvelle esthétique où l''art poétique juxtapose la palette mouvante des sentiments humains et la vision lucide d''une réalité souvent crue – voire triviale – à la plus ineffable beauté. Elles exerceront une influence considérable sur des poètes ultérieurs aussi éminents que Paul Verlaine, Arthur Rimbaud et Stéphane Mallarmé.\n\nGenèse (dès 1841)[modifier | modifier le code]\nLa genèse du recueil reste mal connue.\n\nLes plus anciennes pièces remontent vraisemblablement à 1841 (Une nuit que j''étais près d''une affreuse Juive et À une dame créole1). Un manuscrit soigneusement copié et relié, attesté par l''ami du poète Charles Asselineau, existe déjà en 1850. Mais il n''a pas survécu et on en ignore le contenu.\n\nCertains poèmes sont publiées dans diverses revues :\n\nÀ une dame créole, le 25 mai 1845 dans L''Artiste ;\nLe Vin de l’assassin, en 1848 dans L''Écho des Marchands de vin (apparemment sans intention humoristique) ;\nLesbos, en 1850 dans une anthologie des Poètes de l''amour2.\nLe 1er juin 1855, 18 poèmes paraissent dans la Revue des deux Mondes sous le titre « Fleurs du Mal ».\n\nLe 20 avril 1857, 9 pièces sont publiées dans la Revue française.\n\nPremière édition (1857)[modifier | modifier le code]\nLa publication des Fleurs du Mal a lieu par étapes. Pas moins de quatre éditions, à chaque fois différentes, se succèdent en l''espace d''onze ans, de 1857 à 1868 - année suivant la mort de l''auteur.\n\nLe 4 février 1857, Baudelaire remet à l''éditeur Auguste Poulet-Malassis3, installé à Alençon, un manuscrit contenant 100 poèmes. Ce chiffre lui apparaît comme un nombre d''or, symbole de perfection. Toutefois, il confie à Poulet-Malassis sa crainte qu''une fois imprimé, le volume « ressemble trop à une plaquette ». Tirée à 1 300 exemplaires, cette première édition est mise en vente le 25 juin. Ses « fleurs maladives » sont dédiées au poète Théophile Gautier4, qualifié par Baudelaire, dans sa dédicace, de « parfait magicien des lettres françaises » et « poète impeccable ».\n\nLe 5 juillet 1857, dans le Figaro, Gustave Bourdin critique vertement « l’immoralité » des Fleurs du Mal : « ce livre est un hôpital ouvert à toutes les démences de l’esprit, à toutes les putridités du cœur ; encore si c’était pour les guérir, mais elles sont incurables »5. Toutefois, le 14 juillet, Le Moniteur universel publie un article élogieux d’Édouard Thierry.\n\nProcès et censure (1857)[modifier | modifier le code]\nLe 7 juillet, la direction de la Sûreté publique saisit le parquet pour « outrage à la morale publique » et « offense à la morale religieuse ». Le procureur Ernest Pinard, qui a requis cinq mois plus tôt contre Madame Bovary, se concentre sur le premier chef d''accusation, s''interroge sur l''élément d''intention du second et s''en remet finalement au tribunal. Le second chef d''accusation n''est pas retenu. Le 20 août, maître Pinard prononce son réquisitoire devant la 6e Chambre correctionnelle. La plaidoirie est assurée par Gustave Gaspard Chaix d''Est-Ange6. Le 21 août, Baudelaire et ses éditeurs sont condamnés, pour délit d’outrage à la morale publique, à respectivement 300 et 100 francs d’amende et à la suppression de 6 pièces du recueil : Les Bijoux, Le Léthé, À celle qui est trop gaie, Lesbos, Femmes damnées et Les Métamorphoses du Vampire.', 'Fleurs_du_mal.jpg', '25', 'Juin', 1857, '25', 'Juin', 1857),
(7, 'Parution "Le monde d''hier"', 'Le Monde d’hier. Souvenirs d’un Européen (en allemand Die Welt von Gestern. Erinnerungen eines Europäers) est une autobiographie de l’écrivain autrichien Stefan Zweig parue en 1944.\r\n\r\nL''ouvrage commence avec la description de Vienne à la fin du xixe siècle et celle du milieu familial qui a vu naître Stefan Zweig et se poursuit jusqu''à la déclaration de la Seconde Guerre mondiale, en septembre 1939.', 'monde_d''hier.jpg', NULL, NULL, 1944, NULL, NULL, 1944),
(8, 'Parution "Walden ou la Vie dans les bois"', 'Walden ou la Vie dans les bois (titre original Walden; or, Life in the Woods) est un récit publié en 1854 par l''écrivain américain Henry David Thoreau (1817-1862).\r\n\r\nLe livre raconte la vie que Thoreau a passée dans une cabane pendant deux ans, deux mois et deux jours, dans la forêt appartenant à son ami et mentor Ralph Waldo Emerson, jouxtant l''étang de Walden (Walden Pond), non loin de ses amis et de sa famille qui résidaient à Concord, dans le Massachusetts.', 'Walden_Thoreau.jpg', NULL, 'Août', 1854, NULL, 'Août', 1854),
(10, 'Japan Muromachi Period', 'The Muromachi period (Muromachi jidai, also known as the Muromachi era, the Ashikaga era, or the Ashikaga period) is a division of Japanese history running from approximately 1336 to 1573. The period marks the governance of the Muromachi or Ashikaga shogunate (Muromachi bakufu or Ashikaga bakufu), which was officially established in 1338 by the first Muromachi shogun, Ashikaga Takauji, two years after the brief Kenmu Restoration (1333–36) of imperial rule was brought to a close. The period ended in 1573 when the 15th and last shogun of this line, Ashikaga Yoshiaki, was driven out of the capital in Kyoto by Oda Nobunaga.', NULL, NULL, NULL, 1336, NULL, NULL, 1573),
(11, 'Assassination of Archduke Franz Ferdinand of Austria', 'The assassination of Archduke Franz Ferdinand of Austria, heir presumptive to the Austro-Hungarian throne, and his wife Sophie, Duchess of Hohenberg, occurred on 28 June 1914 in Sarajevo when they were shot dead by Gavrilo Princip. Princip was one of a group of six assassins (five Serbs and one Bosniak) coordinated by Danilo Ili?, a Bosnian Serb and a member of the Black Hand secret society. The political objective of the assassination was to break off Austria-Hungary''s South Slav provinces so they could be combined into a Yugoslavia. The assassins'' motives were consistent with the movement that later became known as Young Bosnia. The assassination led directly to the First World War when Austria-Hungary subsequently issued an ultimatum to the Kingdom of Serbia, which was partially rejected. Austria-Hungary then declared war, triggering actions leading to war between most European states.', NULL, '28', 'Juin', 1914, NULL, '', 1916),
(12, 'Germany invades Luxembourg', 'The German occupation of Luxembourg in World War I was the first of two military occupations of the Grand Duchy of Luxembourg by Germany in the twentieth century. From August 1914 until the end of World War I on 11 November 1918, Luxembourg was under full occupation by the German Empire. The German government justified the occupation by citing the need to support their armies in neighbouring France, although many Luxembourgers, contemporary and present, have interpreted German actions otherwise.\r\n\r\nDuring this period, Luxembourg was allowed to retain its own government and political system, but all proceedings were overshadowed by the German army''s presence. Despite the overbearing distraction of the occupation, the Luxembourgish people attempted to lead their lives as normally as possible. The political parties attempted to focus on other matters, such as the economy, education, and constitutional reform.\r\n\r\nThe domestic political environment was further complicated by the death of Paul Eyschen, who had been Prime Minister for 27 years. With his death came a string of short-lived governments, culminating in rebellion, and constitutional turmoil after the withdrawal of German soldiers.', NULL, '2', 'Août', 1914, '2', 'Août', 1914),
(13, 'Rape of Belgium', 'The Rape of Belgium was the German mistreatment of civilians during the invasion and subsequent occupation of Belgium during World War I. The term initially had a propaganda use but recent historiography confirms its reality.[1] One modern author uses it more narrowly to describe a series of German war crimes in the opening months of the War (August–September 1914).[2]\r\n\r\nThe neutrality of Belgium had been guaranteed by the Treaty of London (1839), which had been signed by Prussia. However, the German Schlieffen Plan required that German armed forces violate Belgium’s neutrality in order to outflank the French Army, concentrated in eastern France. The German Chancellor Theobald von Bethmann Hollweg dismissed the treaty of 1839 as a "scrap of paper".[3] Throughout the beginning of the war the German army engaged in numerous atrocities against the civilian population of Belgium, and destruction of civilian property; 6,000 Belgians were directly killed, 17,700 died during expulsion, deportation, in prison or sentenced to death by court.[4] 25,000 homes and other buildings in 837 communities destroyed in 1914 alone and one and a half million Belgians (20% of the entire population) fled from the invading German army.[5]:13', NULL, '4', 'Août', 1914, '4', 'Août', 1914),
(14, 'Battle of Galicia', 'The Battle of Galicia, also known as the Battle of Lemberg, was a major battle between Russia and Austria-Hungary during the early stages of World War I in 1914. In the course of the battle, the Austro-Hungarian armies were severely defeated and forced out of Galicia, while the Russians captured Lemberg and, for approximately nine months, ruled Eastern Galicia.', NULL, '23', 'Août', 1914, '11', 'Septembre', 1914),
(15, 'Japan declares war on Germany.[19]', 'In the first week of World War I Japan proposed to the United Kingdom, its ally since 1902, that Japan would enter the war if it could take Germany''s Pacific territories.[4] On 7 August 1914, the British government officially asked Japan for assistance in destroying the raiders from the Imperial German Navy in and around Chinese waters. Japan sent Germany an ultimatum on 14 August 1914, which went unanswered; Japan then formally declared war on Germany on 23 August 1914.[5] As Vienna refused to withdraw the Austro-Hungarian cruiser SMS Kaiserin Elisabeth from Tsingtao, Japan declared war on Austria-Hungary, too, on 25 August 1914.[6]\r\n\r\nJapanese forces quickly occupied German-leased territories in the Far East. On 2 September 1914, Japanese forces landed on China''s Shandong province and surrounded the German settlement at Tsingtao (Qingdao). During October, acting virtually independently of the civil government, the Imperial Japanese Navy seized several of Germany''s island colonies in the Pacific - the Mariana, Caroline, and Marshall Islands - with virtually no resistance. The Japanese Navy conducted the world''s first naval-launched air raids against German-held land targets in Shandong province and ships in Qiaozhou Bay from the seaplane-carrier Wakamiya. On 6 September 1914 a seaplane launched by Wakamiya unsuccessfully attacked the Austro-Hungarian cruiser Kaiserin Elisabeth and the German gunboat Jaguar with bombs[7]\r\n\r\nThe Siege of Tsingtao concluded with the surrender of German colonial forces on 7 November 1914.', NULL, '23', 'Août', 1914, '23', 'Août', 1914),
(16, 'Bataille de Grunwald', 'La bataille de Grunwald ou première bataille de Tannenberg eut lieu le 15 juillet 1410 dans le cadre de la Guerre du royaume de Pologne-Lituanie contre l''ordre Teutonique. L''alliance du Royaume de Pologne et du grand-duché de Lituanie, menés respectivement par le roi Ladislas II Jagellon (W?adys?aw Jagie??o) et le grand-duc Vytautas (Witold) écrasa les chevaliers Teutoniques commandés par le grand-maître Ulrich von Jungingen. La plupart des commandants teutoniques furent soit tués soit capturés. Malgré la défaite, les chevaliers teutoniques parviennent à résister au siège de Marienbourg et les pertes territoriales lors de la Paix de Toru? (1411) sont limitées. Les disputes territoriales continuèrent jusqu''à la signature de la Paix du lac de Melno en 1422. Cependant, l''ordre Teutonique ne se relèvera jamais de cette défaite et le fardeau financier des indemnités de guerre entraina des tensions internes et une crise économique sur ses terres. La bataille marque un basculement significatif des pouvoirs en Europe Orientale et permet à l''Union de Pologne-Lituanie de devenir la puissance politique et militaire dominante dans la région9.\n\nLa bataille fut l''une des plus importantes de l''Europe médiévale et est considérée comme la plus importante victoire dans l''histoire polonaise et lituanienne10. Portée par le nationalisme romantique, elle devint un symbole de résistance face aux envahisseurs et une source de fierté nationale. Au cours du xxe siècle, la bataille fut exploitée à la fois par les propagandes nazie et soviétique. Ainsi, la vision de cette bataille reste encore aujourd''hui largement dépendante de la nationalité.', 'grunwaldem.jpg', '6', 'Février', 1411, '19', 'Janvier', 1519);

--
-- Contenu de la table `event_has_category`
--

INSERT INTO `event_has_category` (`idEvent`, `idCategory`) VALUES
(2, 1),
(2, 2),
(2, 4),
(2, 5),
(3, 6),
(4, 3),
(5, 3),
(6, 1),
(6, 8),
(7, 8),
(8, 8),
(10, 2),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(14, 2),
(15, 1),
(15, 2),
(16, 1);

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`idUser`, `email`, `pwHash`, `isAdmin`) VALUES
(1, 'admin@gmail.com', '$2y$10$VBt2e7RyNFUcOitNF2dDIOX8mPjE1o5OW/rnaBMc4JF14clhblL3K', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
