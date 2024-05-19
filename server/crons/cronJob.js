const cron = require("node-cron");
const { findAndDeleteOrphanedAddresses } = require("../service/addressService");

// clean db for orphaned address once a month
cron.schedule("0 0 1 * *", async () => {
  await findAndDeleteOrphanedAddresses();
});

