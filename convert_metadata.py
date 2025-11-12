import click
import os
import csv

from datetime import datetime

def catalogue_id_to_previews_code(catalogue_id: str) -> str:
    month_names = [
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ]

    month_part = catalogue_id[:3]
    year_part = catalogue_id[3:5]
    item_part = catalogue_id[5:]

    month_index = month_names.index(month_part) + 1
    year_full = 2000 + int(year_part)

    epoch = datetime(1988, 9, 1)
    target_date = datetime(year_full, month_index, 1)

    delta_months = (target_date.year - epoch.year) * 12 + (target_date.month - epoch.month)

    return f"{delta_months}/{item_part}"



@click.command()
@click.argument('metadata_path', type=click.Path(exists=True))
@click.argument('ace_path', type=click.Path(exists=True))
def process_csv(metadata_path: str, ace_path: str):
    if not os.path.isfile(metadata_path):
        click.echo(f"Error: {metadata_path} is not a file.")
        return

    if not os.path.isfile(ace_path):
        click.echo(f"Error: {ace_path} is not a file.")
        return

    previews_md = {}
    with open(metadata_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            ace_code = catalogue_id_to_previews_code(row['CODE'])
            offered_again = row['OFFERED AGAIN'].strip().upper() == 'YES'
            description = row["SOLICIT TEXT"]
            creators = row["CONTRIBUTORS"]
            previews_md[ace_code] = [str(offered_again).lower(), description, creators]
            
    with open(ace_path, newline='', encoding='iso8859-1') as acefile:
        reader = csv.reader(acefile)
        writer = csv.writer(click.get_text_stream('stdout'))
        for row in reader:
            if row[0] in previews_md:
                row.extend(previews_md[row[0]])

            writer.writerow(row)

if __name__ == '__main__':
    process_csv()
