import moment from "moment";
import Hooks from "@reactioncommerce/hooks";
import Logger from "@reactioncommerce/logger";
import { Meteor } from "meteor/meteor";
import { Job } from "/imports/plugins/core/job-collection/lib";
import { Jobs, Logs } from "/lib/collections";
import taxCalc from "../methods/taxCalc";

/**
 * @summary Remove logs older than the configured number of days
 * @param {Function} callback - function to call when process complete
 * @returns {Number} results of remmoval query
 * @private
 */
function cleanupAvalaraJobs(callback) {
  const pkgData = taxCalc.getPackageData();
  if (pkgData && pkgData.settings.avalara.enabled) {
    const saveDuration = pkgData.settings.avalara.logRetentionDuration;
    const olderThan = moment().subtract(saveDuration, "days");
    const result = Logs.remove({
      date: {
        $lt: olderThan
      }
    });
    Logger.debug(`Removed ${result} Avalara log records`);
  }
  callback();
}

/**
 * @summary Remove logs older than the configured number of days
 * @param {Function} callback - function to call when process complete
 * @returns {Number} results of remmoval query
 * @private
 */
export function setupAvalaraCleanupHook() {
  Hooks.Events.add("afterCoreInit", () => {
    if (!Meteor.isAppTest) {
      Logger.debug("Adding Avalara log cleanup job and removing existing");
      new Job(Jobs, "logs/removeOldAvalaraLogs", {})
        .priority("normal")
        .retry({
          retries: 5,
          wait: 60000,
          backoff: "exponential"
        })
        .save({
          cancelRepeats: true
        });
    }
  });
}

/**
 * @summary Define the job to remove old Avalara logs
 * @returns {undefined}
 */
export function cleanupAvalogs() {
  Jobs.processJobs(
    "logs/removeOldAvalaraLogs",
    {
      pollInterval: 30 * 1000,
      workTimeout: 180 * 1000
    },
    (job, callback) => {
      Logger.debug("Avalara log cleanup running");
      cleanupAvalaraJobs((error) => {
        if (error) {
          job.done(error.toString(), { repeatId: true });
          callback();
        } else {
          const success = "Avalara Log Cleanup ran successfully";
          Logger.debug(success);
          job.done(success, { repeatId: true });
          callback();
        }
      });
    }
  );
}
