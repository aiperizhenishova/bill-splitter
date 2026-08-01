import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1780000000000 implements MigrationInterface {
  name = 'InitialSchema1780000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "expiresAt" TIMESTAMP, "name" character varying NOT NULL, "ownerId" character varying NOT NULL, "qrUrl" character varying, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "dishes" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "price" numeric(10,2) NOT NULL, "sessionId" uuid, CONSTRAINT "PK_f4748c8e8382ad34ef517520b7b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "qr_code" ("id" SERIAL NOT NULL, "qrPath" character varying, "fileSize" integer, "s3Key" character varying, CONSTRAINT "PK_21be15bed42505b3cddf438a037" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session_dishes" ("sessionId" uuid NOT NULL, "dishId" integer NOT NULL, "name" character varying NOT NULL, "price" numeric NOT NULL, CONSTRAINT "PK_c916d8aba9cec6cd50e2ceeb7b0" PRIMARY KEY ("sessionId", "dishId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "token" character varying(64) NOT NULL, "sessionId" uuid NOT NULL, CONSTRAINT "UQ_4a97f386ddb7fa00ee22643e2c6" UNIQUE ("token"), CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "selections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "participantId" uuid NOT NULL, "dishId" integer NOT NULL, CONSTRAINT "UQ_5bd2251c6afe7c66e32166ce60c" UNIQUE ("participantId", "dishId"), CONSTRAINT "PK_ca8c40db57a61d47e4f5fbbf04e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "dishes" ADD CONSTRAINT "FK_2aa3d8cd75925d3f002db8261fa" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_dishes" ADD CONSTRAINT "FK_3e2d951cb3a5b6d7b4664dc1459" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "participants" ADD CONSTRAINT "FK_64e28620b98e2db85f6734698a3" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "selections" ADD CONSTRAINT "FK_1eea56fa79ff458aafb55c63ace" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "selections" DROP CONSTRAINT "FK_1eea56fa79ff458aafb55c63ace"`,
    );
    await queryRunner.query(
      `ALTER TABLE "participants" DROP CONSTRAINT "FK_64e28620b98e2db85f6734698a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_dishes" DROP CONSTRAINT "FK_3e2d951cb3a5b6d7b4664dc1459"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dishes" DROP CONSTRAINT "FK_2aa3d8cd75925d3f002db8261fa"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "selections"`);
    await queryRunner.query(`DROP TABLE "participants"`);
    await queryRunner.query(`DROP TABLE "session_dishes"`);
    await queryRunner.query(`DROP TABLE "qr_code"`);
    await queryRunner.query(`DROP TABLE "dishes"`);
    await queryRunner.query(`DROP TABLE "sessions"`);
  }
}
