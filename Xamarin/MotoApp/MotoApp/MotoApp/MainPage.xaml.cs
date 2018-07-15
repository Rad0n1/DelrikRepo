using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using PCLStorage;
using MotoApp.Droid;

namespace MotoApp
{
	public partial class MainPage : ContentPage
	{
        FileActions fileActions = new FileActions();
        string folderName = "saveDataFolder";
        string fileName = "saveData.txt";

        public MainPage()
		{

            InitializeComponent();
            this.FindByName<Button>("writeButton").Clicked += WriteFile;
            this.FindByName<Button>("readButton").Clicked += ReadFile;
		}

        private async void WriteFile(object sender, EventArgs e)
        {
            string[] data;
            string stringData = value1.Text + "." + value2.Text + "." + value3.Text + ".";
            data = stringData.Split('.');

            await fileActions.WriteFile(folderName, fileName, data);
        }

        private async void ReadFile(object sender, EventArgs e)
        {
            string[] fileData = await fileActions.GetFileData(folderName, fileName);
            foreach (var item in fileData)
            {
                label1.Text += item;
            }
        }
	}
}
