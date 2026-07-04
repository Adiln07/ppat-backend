-- CreateTable
CREATE TABLE `Kota` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Kota_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notaris` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `skPpat` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `mapUrl` VARCHAR(191) NOT NULL,
    `kotaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Notaris_skPpat_key`(`skPpat`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notaris` ADD CONSTRAINT `Notaris_kotaId_fkey` FOREIGN KEY (`kotaId`) REFERENCES `Kota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
