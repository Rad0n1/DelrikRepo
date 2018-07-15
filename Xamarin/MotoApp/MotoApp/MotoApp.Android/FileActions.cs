using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using PCLStorage;
using System.Threading.Tasks;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;

namespace MotoApp.Droid
{
    class FileActions
    {
        public async Task WriteFile(string folderName, string fileName, string[] decodedData)
        {
            string oldData = string.Empty;
            string encodedData = await EncodeData(decodedData);
            IFolder rootFolder = FileSystem.Current.LocalStorage;
            IFolder saveFolder = await rootFolder.CreateFolderAsync(folderName, CreationCollisionOption.OpenIfExists);

            ExistenceCheckResult checkResult = await saveFolder.CheckExistsAsync(fileName);
            if (checkResult == ExistenceCheckResult.NotFound)
            {
                IFile newData = await saveFolder.CreateFileAsync(fileName, CreationCollisionOption.ReplaceExisting);
                await newData.WriteAllTextAsync(encodedData);
            }
            else
            {
                IFile oldDataFile = await saveFolder.GetFileAsync(fileName);
                oldData = await oldDataFile.ReadAllTextAsync();
                oldData += encodedData;
                IFile newData = await saveFolder.CreateFileAsync(fileName, CreationCollisionOption.ReplaceExisting);
                await newData.WriteAllTextAsync(oldData);
            }


        }

        public async Task<string[]> GetFileData(string folderName, string fileName)
        {
            IFolder rootFolder = FileSystem.Current.LocalStorage;
            IFolder saveFolder = await rootFolder.CreateFolderAsync(folderName, CreationCollisionOption.OpenIfExists);
            IFile saveData = await saveFolder.GetFileAsync(fileName);
            string encodedData = await saveData.ReadAllTextAsync();
            string[] decodedData = encodedData.Split('.');
            return decodedData;
        }

        private async Task<string> EncodeData(string[] data)
        {
            string encodedData = string.Empty;
            foreach (string item in data)
            {
                encodedData += item + ".";
            }

            return encodedData;
        }
    }
}