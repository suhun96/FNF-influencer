import { MigrationInterface, QueryRunner } from "typeorm";

export class Models1652409652926 implements MigrationInterface {
    name = 'Models1652409652926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_email\` varchar(100) NOT NULL, \`user_password\` varchar(200) NOT NULL, \`user_brandname\` varchar(50) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status_name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`category_name\` varchar(100) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`influencer_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`influencerID\` int NOT NULL, \`categoryID\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hashtag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hashtag_name\` varchar(100) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`influencer_hashtag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`influencerID\` int NOT NULL, \`hashtagID\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`influencer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`influencer_instagram_id\` varchar(50) NOT NULL, \`influencer_img\` varchar(255) NOT NULL, \`influencer_gender\` varchar(20) NOT NULL, \`influencer_follower\` int NOT NULL, \`influencer_posting\` int NOT NULL, \`influencer_average_like\` int NOT NULL, \`influencer_average_comment\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message_content\` varchar(500) NULL, \`influencerID\` int NOT NULL, \`campaignID\` int NOT NULL, \`statusID\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`campaign\` (\`id\` int NOT NULL AUTO_INCREMENT, \`campaign_name\` varchar(100) NOT NULL, \`userID\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`influencer_category\` ADD CONSTRAINT \`FK_88a014f7f080693e6a1b7fc2731\` FOREIGN KEY (\`influencerID\`) REFERENCES \`influencer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`influencer_category\` ADD CONSTRAINT \`FK_08f72e4a7209a9e2c58145a3e5b\` FOREIGN KEY (\`categoryID\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`influencer_hashtag\` ADD CONSTRAINT \`FK_3bafea3bca587136b00ff8a08aa\` FOREIGN KEY (\`influencerID\`) REFERENCES \`influencer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`influencer_hashtag\` ADD CONSTRAINT \`FK_db4d980ca9e05f823772a53035d\` FOREIGN KEY (\`hashtagID\`) REFERENCES \`hashtag\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_d0581aaf440af1dcda1c9b6c48d\` FOREIGN KEY (\`campaignID\`) REFERENCES \`campaign\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_f0e31a4d8a69e7fd914975b0fa5\` FOREIGN KEY (\`statusID\`) REFERENCES \`status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_89b2b2c9b15a1f14dfa698c4001\` FOREIGN KEY (\`influencerID\`) REFERENCES \`influencer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`campaign\` ADD CONSTRAINT \`FK_108edd8fb3b30a2616222683088\` FOREIGN KEY (\`userID\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`campaign\` DROP FOREIGN KEY \`FK_108edd8fb3b30a2616222683088\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_89b2b2c9b15a1f14dfa698c4001\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_f0e31a4d8a69e7fd914975b0fa5\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_d0581aaf440af1dcda1c9b6c48d\``);
        await queryRunner.query(`ALTER TABLE \`influencer_hashtag\` DROP FOREIGN KEY \`FK_db4d980ca9e05f823772a53035d\``);
        await queryRunner.query(`ALTER TABLE \`influencer_hashtag\` DROP FOREIGN KEY \`FK_3bafea3bca587136b00ff8a08aa\``);
        await queryRunner.query(`ALTER TABLE \`influencer_category\` DROP FOREIGN KEY \`FK_08f72e4a7209a9e2c58145a3e5b\``);
        await queryRunner.query(`ALTER TABLE \`influencer_category\` DROP FOREIGN KEY \`FK_88a014f7f080693e6a1b7fc2731\``);
        await queryRunner.query(`DROP TABLE \`campaign\``);
        await queryRunner.query(`DROP TABLE \`message\``);
        await queryRunner.query(`DROP TABLE \`influencer\``);
        await queryRunner.query(`DROP TABLE \`influencer_hashtag\``);
        await queryRunner.query(`DROP TABLE \`hashtag\``);
        await queryRunner.query(`DROP TABLE \`influencer_category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`status\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
